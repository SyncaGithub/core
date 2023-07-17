import { ClientProxy } from "@nestjs/microservices";
import { ClientRepo, ProductRepo } from "../repositories";
import { EActionType, IUpdateJobHistory } from "../types";
import { ClientDocument, JobDocument, JobHistoryDocument } from "../models";
import { Logger } from "@nestjs/common";
import { DateTime } from "luxon";
export declare abstract class BaseService {
    abstract readonly _logger: Logger;
    private readonly _productRepo;
    private readonly _clientRepo;
    private readonly _queueClient;
    protected constructor(productRepo: ProductRepo, clientRepo: ClientRepo, queueClient: ClientProxy);
    handleAction<T>(job: JobDocument, cb: (lastUpdate: DateTime, client: ClientDocument) => Promise<IHandleActionReturn<T>>, config: IHandleActionConfig): Promise<T>;
    finishJob(job: JobDocument, jobActionType: EActionType, jobHistory: Partial<JobHistoryDocument>): void;
    updateJobHistory(jobHistoryUpdate: IUpdateJobHistory): void;
    updateJobHistoryCounters(jobHistoryUpdate: IUpdateJobHistory): void;
}
export interface IHandleActionConfig {
    isClientStatusAffected: boolean;
    isClientUpdateTimeAffected: boolean;
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
