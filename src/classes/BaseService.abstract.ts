import {take} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {ClientRepo, ProductRepo} from "../repositories";
import {EActionStatus, EActionType, EntityStatus, IJobFinish, IUpdateJobHistory} from "../types";
import {ClientDocument, JobDocument, JobHistoryDocument} from "../models";
import {Logger} from "@nestjs/common";
import {DateTime} from "luxon";

export abstract class BaseService {
    private readonly _logger: Logger;
    // private readonly _productRepo: ProductRepo;
    private readonly _clientRepo: ClientRepo;
    private readonly _queueClient: ClientProxy;

    protected constructor(
        logger: Logger,
        productRepo: ProductRepo,
        clientRepo: ClientRepo,
        queueClient: ClientProxy
    ) {
        this._logger = logger;
        // this._productRepo = productRepo;
        this._clientRepo = clientRepo;
        this._queueClient = queueClient;
    }

    async handleAction<T>(
        job: JobDocument,
        cb: (lastUpdateISO: DateTime) => Promise<IHandleActionReturn<T>>,
        config: {
            type: EActionType;
            isClientChange: boolean;
            isClientTimeUpdate: boolean;
        }
    ) {
        let client: ClientDocument;
        try {
            client = await this._clientRepo.findOne({
                user: job.user,
                _id: job.actionList[job.currentActinIndex].client
            });
        }catch (error){
            return Promise.reject(`Cannot find client with id: ${job.actionList[job.currentActinIndex].client}`);
        }
        try {
            if (config.isClientChange) {
                await client.startWorking();
            }
            this._logger.debug(`Start Action: ${config.type}`);
            this._logger.debug('current Index: ' + job.currentActinIndex);
            this._logger.debug(`current client: ${client.nickname} (${client._id})`);

            const lastUpdateISO = DateTime.local({zone: process.env.TZ});

            const response = await cb(lastUpdateISO);

            if (config.isClientChange) {
                if (config.isClientTimeUpdate) {
                    await client.finishWorking(lastUpdateISO.toISO());
                } else {
                    await client.finishWorking();
                }
            }
            this.finishJob(job, config.type, {
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
            this._logger.error(`Failed Action: ${config.type}`);
            this.finishJob(job, config.type, {
                status: EActionStatus.FAILED,

                error:
                    typeof error === 'string'
                        ? error
                        : error?.message
                            ? error?.message
                            : Object.keys(error)?.join(',')
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
                actionStatus: jobHistory.status as EActionStatus,
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

export interface IHandleActionReturn<T = any> {
    jobHistoryUpdate: Partial<JobHistoryDocument>;
    result: T;
}

export interface ISellerService {
    addOrUpdateProductAPI<T = any>(job: JobDocument): Promise<T>;

    getOrdersAPI<Order = any>(job: JobDocument): Promise<Order[]>;

    acknowledgeProductAPI<T = any>(job: JobDocument): Promise<T>;

    getTotalOrdersAPI<T = any>(job: JobDocument): Promise<T>;

    updateOrderAPI<T = any>(job: JobDocument): Promise<T>;
}

export interface IWarehouseService {
    getProductsAPI<T = any>(job: JobDocument): Promise<T>;

    lookupProductsAPI<T = any>(job: JobDocument): Promise<T>;

    sendOrderAPI<T = any>(job: JobDocument): Promise<T>;
}