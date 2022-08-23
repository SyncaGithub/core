import { Document, Model, Schema, Types } from "mongoose";
import { EntityStatus, EClientType } from "../types";
export interface IClient extends Document {
    userId: Types.ObjectId;
    status: EntityStatus;
    clientType: EClientType;
    workWithClients: Types.ObjectId[];
    nickname: string;
    barcodeTag: string;
    sellPriceMultiple: number;
    sellPriceFormula: string;
    lastUpdate: string;
    isTempCategory: boolean;
    tempCategory: string;
    priority: {
        username: string;
        password: string;
        baseUrl: string;
        agentName: string;
        paymentCode: string;
        cashNumber: string;
        customerNumber: string;
        productsEndPoint: string;
        invoiceEndPoint: string;
        ordersEndPoint: string;
        priceKey: string;
        getProductsFilters: {
            key: string;
            value: string;
            operator: string;
        }[];
        getProductsExpand: string;
        getProductsSelect: string;
        productMap: {
            [key: string]: string;
        };
    };
    cashcow: {
        store_id: number;
        token: string;
    };
    isUsingWhiteList: boolean;
    whiteListProducts: Types.ObjectId[];
    isUsingBlackList: boolean;
    blackListProducts: Types.ObjectId[];
    isClientBusy: () => Promise<boolean>;
}
export interface IClientModel extends Model<IClient> {
    isClientBusy: () => Promise<boolean>;
}
export declare const ClientSchema: Schema<IClient, IClientModel, IClientModel, {}, {}, {}, "type", IClient>;
//# sourceMappingURL=Client.model.d.ts.map