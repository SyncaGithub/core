/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Document } from "mongoose";
import { EClientType, EntityStatus, EProductSellProperty } from "../types";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
import { Product } from "./Product.model";
export type ClientDocument<T = ClientConfigurationTypes, P extends IPopulated | IRaw = IRaw> = Client<T, P> & Document & ClientMethods;
export interface ClientMethods {
    startWorking<T = ClientDocument>(): Promise<T>;
    finishWorking<T = ClientDocument>(updateDate?: string): Promise<T>;
}
export type ClientConfigurationTypes = PriorityClientConfiguration | CashcowClientConfiguration | WooCommerceClientConfiguration | GenericApiClientConfiguration;
export declare class CashcowClientConfiguration {
    store_id: number;
    token: string;
    isUploadingProductsWithoutQty: boolean;
    keysToIgnoreInExistingProduct: string[];
}
export declare class WooCommerceClientConfiguration {
    apiUrl: string;
    consumerKey: string;
    consumerSecret: string;
    productsChunkLimit: number;
    keysToIgnoreInExistingProduct: string[];
    isUsingManagedStock: boolean;
}
export declare class GenericApiClientConfiguration {
    apiUrl: string;
    productMap: Record<keyof Product, string[]>;
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
    agentCode: string;
    paymentCode: string;
    paymentCodePaypal: string;
    cashNumber: string;
    customerNumber: string;
    productsEndPoint: string;
    invoiceEndPoint: string;
    ordersEndPoint: string;
    priceKey: string;
    minQty: number;
    productsBadStatuses: string[];
    sellBarcodeKey: EProductSellProperty;
    getProductsFilters: PriorityProductFilter[];
    getProductsExpand: string;
    getProductsSelect: string;
    productMap: Record<keyof Product, string[]>;
    isUsingSummaryPage: boolean;
    isRemovingOrdersFromQty: boolean;
    usingWARHSNAME: string[];
}
export declare class Client<T = ClientConfigurationTypes, P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    status: EntityStatus;
    clientType: EClientType;
    configuration: T;
    priority: PriorityClientConfiguration;
    genericApi: GenericApiClientConfiguration;
    wooCommerce: WooCommerceClientConfiguration;
    cashcow: CashcowClientConfiguration;
    workWithClients: Client[];
    nickname: string;
    barcodeTag: string;
    sellPriceMultiple: number;
    sellPriceFormula: string;
    minPriceForFreeDelivery: number;
    deliveryBarcode: string;
    lastUpdate: string;
    isTempCategory: boolean;
    tempCategory: string;
    isUsingWhiteList: boolean;
    whiteListProducts: mongoose.Types.ObjectId[];
    isUsingBlackList: boolean;
    blackListProducts: mongoose.Types.ObjectId[];
}
export declare const ClientSchema: mongoose.Schema<Client<unknown, IPopulated | IRaw>, mongoose.Model<Client<unknown, IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Client<unknown, IPopulated | IRaw>>;
