import { ClientProxy } from "@nestjs/microservices";
import { ClientRepo, ProductRepo } from "../repositories";
import { EActionType, IUpdateJobHistory } from "../types";
import { JobDocument, JobHistoryDocument } from "../models";
export declare abstract class BaseService {
    private readonly _queueClient;
    protected constructor(productRepo: ProductRepo, clientRepo: ClientRepo, queueClient: ClientProxy);
    finishJob(job: JobDocument, jobActionType: EActionType, jobHistory: Partial<JobHistoryDocument>): void;
    updateJobHistory(jobHistoryUpdate: IUpdateJobHistory): void;
    updateJobHistoryCounters(jobHistoryUpdate: IUpdateJobHistory): void;
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
