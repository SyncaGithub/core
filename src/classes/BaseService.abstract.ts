import {take} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {ClientRepo, ProductRepo} from "../repositories";
import {EActionStatus, EActionType, EntityStatus, IJobFinish, IUpdateJobHistory} from "../types";
import {ClientDocument, JobDocument, JobHistoryDocument} from "../models";
import {Logger} from "@nestjs/common";
import {DateTime} from "luxon";

export abstract class BaseService {
    abstract readonly _logger: Logger;

    private readonly _productRepo: ProductRepo;
    private readonly _clientRepo: ClientRepo;
    private readonly _queueClient: ClientProxy;


    protected constructor(
        productRepo: ProductRepo,
        clientRepo: ClientRepo,
        queueClient: ClientProxy
    ) {
        this._productRepo = productRepo;
        this._clientRepo = clientRepo;
        this._queueClient = queueClient;
    }

    async handleAction<T>(
        job: JobDocument,
        cb: (lastUpdate: DateTime, client: ClientDocument) => Promise<IHandleActionReturn<T>>,
        config: IHandleActionConfig
    ) {
        let client: ClientDocument;
        const type: EActionType = job.actionList[job.currentActionIndex].action;
        try {
            client = await this._clientRepo.findOne({
                user: job.user,
                _id: job.actionList[job.currentActionIndex].client
            });
        }catch (error){
            return Promise.reject(`Cannot find client with id: ${job.actionList[job.currentActionIndex].client}`);
        }
        try {
            if (config.isClientStatusAffected) {
                await client.startWorking();
            }
            this._logger.debug(`
Start Action: ${type} | Client: ${client.nickname} (${client._id})
Action Index: ${job.currentActionIndex}
            `);

            const lastUpdate = DateTime.local({zone: process.env.TZ});

            const response = await cb(lastUpdate, client);

            if (config.isClientStatusAffected) {
                if (config.isClientUpdateTimeAffected) {
                    await client.finishWorking(lastUpdate.toISO());
                } else {
                    await client.finishWorking();
                }
            }
            this._logger.debug(`Action Success: ${type}`);
            this.finishJob(job, type, {
                ...response.jobHistoryUpdate,
                status: EActionStatus.SUCCESS,
            });
            return Promise.resolve(response.result);
        } catch (error) {
            this._logger.error(error);
            if (client) {
                client.status = EntityStatus.CRASHED;
                await client.save();
            }
            this._logger.error(`Action Failed: ${type}`);
            this.finishJob(job, type, {
                status: EActionStatus.FAILED,

                error:
                    typeof error === 'string'
                        ? error
                        : error?.message
                            ? error?.message
                            : JSON.stringify(error, null, 4)
            });
            return Promise.reject(error);
        }
    }

    finishJob(
        job: JobDocument,
        jobActionType: EActionType,
        jobHistory: Partial<JobHistoryDocument>
    ) {
        this._queueClient
            .send<void, IJobFinish>('jobFinish', {
                actionStatus: jobHistory.status,
                job,
                finishedJob: jobActionType,
                jobHistoryData: jobHistory
            })
            .pipe(take(1))
            .subscribe();
    }

    updateJobHistory(jobHistoryUpdate: IUpdateJobHistory) {
        this._queueClient
            .send<void, IUpdateJobHistory>('updateJobHistory', jobHistoryUpdate)
            .pipe(take(1))
            .subscribe();
    }

    updateJobHistoryCounters(jobHistoryUpdate: IUpdateJobHistory) {
        this._queueClient
            .send<void, IUpdateJobHistory>(
                'updateJobHistoryCounters',
                jobHistoryUpdate
            )
            .pipe(take(1))
            .subscribe();
    }
}

export interface IHandleActionConfig{
    isClientStatusAffected: boolean;
    isClientUpdateTimeAffected: boolean;
}

export interface IHandleActionReturn<T = any> {
    jobHistoryUpdate: Partial<JobHistoryDocument>;
    result: T;
}

export interface AddOrUpdateProducts{
    addOrUpdateProductAPI<T = any>(job: JobDocument): Promise<T>;
}

export interface GetOrders{
    getOrdersAPI<Order = any>(job: JobDocument): Promise<Order[]>;
}

export interface GetProducts{
    getProductsAPI<T = any>(job: JobDocument): Promise<T>;
}

export interface AcknowledgeExistsProducts{
    acknowledgeProductAPI<T = any>(job: JobDocument): Promise<T>;
}

export interface GetTotalOrders{
    getTotalOrdersAPI<T = number>(job: JobDocument): Promise<T>;
}

export interface UpdateOrder {
    updateOrderAPI<T = any>(job: JobDocument): Promise<T>;
}

export interface SendOrder {
    sendOrderAPI<T = any>(job: JobDocument): Promise<T>;
}

export interface LookupProducts{
    lookupProductsAPI<T = any>(job: JobDocument): Promise<T>;
}