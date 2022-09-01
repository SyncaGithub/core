import mongoose, { Document } from "mongoose";
import { EClientType, EntityStatus, IRawPriorityProduct } from "../types";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export declare type ClientDocument<T = ClientConfigurationTypes, P extends IPopulated | IRaw = IRaw> = Client<T, P> & Document & ClientMethods;
export interface ClientMethods {
    isClientBusy: () => Promise<boolean>;
}
export declare type ClientConfigurationTypes = PriorityClientConfiguration | CashcowClientConfiguration;
export declare class CashcowClientConfiguration {
    store_id: number;
    token: string;
}
export declare class PriorityProductFilter {
    key: string;
    value: string;
    operator: string;
}
export declare class PriorityClientConfiguration {
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
    getProductsFilters: PriorityProductFilter[];
    getProductsExpand: string;
    getProductsSelect: string;
    productMap: {
        [key: string]: keyof IRawPriorityProduct;
    };
}
export declare class Client<T = ClientConfigurationTypes, P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    status: EntityStatus;
    clientType: EClientType;
    configuration: T;
    priority: PriorityClientConfiguration;
    cashcow: CashcowClientConfiguration;
    workWithClients: Client[];
    nickname: string;
    barcodeTag: string;
    sellPriceMultiple: number;
    sellPriceFormula: string;
    lastUpdate: string;
    isTempCategory: boolean;
    tempCategory: string;
    isUsingWhiteList: boolean;
    whiteListProducts: mongoose.Types.ObjectId[];
    isUsingBlackList: boolean;
    blackListProducts: mongoose.Types.ObjectId[];
}
export declare const ClientSchema: mongoose.Schema<Client<unknown, IPopulated | IRaw>, mongoose.Model<Client<unknown, IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, "type", Client<unknown, IPopulated | IRaw>>;
//# sourceMappingURL=Client.model.d.ts.map