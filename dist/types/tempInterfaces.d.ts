import { Types } from "mongoose";
import { IJobHistory } from "../models";
import { IJob } from "../models/Job.model";
import { EActionType, EntityStatus } from "./tempEnums";
export interface BaseEntity {
    userId: String;
    status: EntityStatus;
    nickname: string;
}
export interface IOrder {
    Id: number;
    TotalPrice: number;
    Products: {
        sku: string;
        Qty: number;
    }[];
    IsSelfDelivery: boolean;
    Email: string;
    Phone: string;
    City: string;
    Address: string;
    StreetNameAndNumber: string;
    ApartmentNumber: string;
    FloorNumber: string;
    FirstName: string;
    LastName: string;
    LastDigits: string;
    OrderDate: string;
}
export interface IJobFinish {
    job: IJob;
    finishedJob: EActionType;
    jobHistoryData?: Partial<IJobHistory>;
}
export interface IUpdateJobHistory {
    jobHistoryId: Types.ObjectId | string;
    dataToUpdate: Partial<IJobHistory>;
}
export interface IClientFilters {
    userId: string;
    _id: string;
}
export interface ILoadExcel<Product = any> {
    products: Product[];
    userId: string;
}
//# sourceMappingURL=tempInterfaces.d.ts.map