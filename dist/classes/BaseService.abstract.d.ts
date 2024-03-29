import { ClientProxy } from "@nestjs/microservices";
import { ClientRepo, ProductRepo, UserRepo } from "../repositories";
import { EActionType, IUpdateJobHistory } from "../types";
import { ClientDocument, JobDocument, JobHistoryDocument } from "../models";
import { Logger } from "@nestjs/common";
import { DateTime } from "luxon";
import { EmailService } from "../services";
export declare abstract class BaseService {
    abstract readonly _logger: Logger;
    private readonly _productRepo;
    private readonly _clientRepo;
    private readonly _userRepo;
    private readonly _queueClient;
    protected constructor(productRepo: ProductRepo, clientRepo: ClientRepo, userRepo: UserRepo, queueClient: ClientProxy);
    handleAction<T>(job: JobDocument, cb: (lastUpdate: DateTime, client: ClientDocument) => Promise<IHandleActionReturn<T>>, config: IHandleActionConfig): Promise<T>;
    finishJob(job: JobDocument, jobActionType: EActionType, jobHistory: Partial<JobHistoryDocument>): void;
    updateJobHistory(jobHistoryUpdate: IUpdateJobHistory): void;
    updateJobHistoryCounters(jobHistoryUpdate: IUpdateJobHistory): void;
}
export interface IHandleActionConfig {
    isClientStatusAffected: boolean;
    isClientUpdateTimeAffected: boolean;
    emailService?: EmailService;
}
export interface IHandleActionReturn<T = any> {
    jobHistoryUpdate: Partial<JobHistoryDocument>;
    result: T;
}
export interface AddOrUpdateProducts {
    addOrUpdateProductAPI<T = any>(job: JobDocument): Promise<T>;
}
export interface GetOrders {
    getOrdersAPI<Order = any>(job: JobDocument): Promise<Order[]>;
}
export interface GetProducts {
    getProductsAPI<T = any>(job: JobDocument): Promise<T>;
}
export interface AcknowledgeExistsProducts {
    acknowledgeProductAPI<T = any>(job: JobDocument): Promise<T>;
}
export interface GetTotalOrders {
    getTotalOrdersAPI<T = number>(job: JobDocument): Promise<T>;
}
export interface UpdateOrder {
    updateOrderAPI<T = any>(job: JobDocument): Promise<T>;
}
export interface SendOrder {
    sendOrderAPI<T = any>(job: JobDocument): Promise<T>;
}
export interface LookupProducts {
    lookupProductsAPI<T = any>(job: JobDocument): Promise<T>;
}
