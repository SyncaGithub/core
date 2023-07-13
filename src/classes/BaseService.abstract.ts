import {take} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {ClientRepo, ProductRepo} from "../repositories";
import {EActionStatus, EActionType, IJobFinish, IUpdateJobHistory} from "../types";
import {JobDocument, JobHistoryDocument} from "../models";

export abstract class BaseService {
    // private readonly _productRepo: ProductRepo;
    // private readonly _clientRepo: ClientRepo;
    private readonly _queueClient: ClientProxy;

    protected constructor(
        productRepo: ProductRepo,
        clientRepo: ClientRepo,
        queueClient: ClientProxy
    ) {
        // this._productRepo = productRepo;
        // this._clientRepo = clientRepo;
        this._queueClient = queueClient;
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

export interface ISellerService {
    addOrUpdateProductAPI(job: JobDocument): Promise<any>;

    getOrdersAPI<Order = any>(job: JobDocument): Promise<Order[]>;

    acknowledgeProductAPI(job: JobDocument): Promise<any>;

    getTotalOrdersAPI(job: JobDocument): Promise<number>;

    updateOrderAPI(job: JobDocument): Promise<any>;
}

export interface IWarehouseService {
    getProductsAPI(job: JobDocument): Promise<any>;

    lookupProductsAPI(job: JobDocument): Promise<any>;

    sendOrderAPI(job: JobDocument): Promise<any>;
}