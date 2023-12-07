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
import mongoose, { Schema as MongooseSchema, Document } from "mongoose";
import { EClientType, EQtyType } from "../types";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export type ProductDocument<P extends IPopulated | IRaw = IRaw> = Product<P> & Document;
export declare class ProductFail<P extends IPopulated | IRaw = IRaw> {
    client: P extends IRaw ? mongoose.Types.ObjectId : Client;
    data: MongooseSchema.Types.Mixed;
    config?: MongooseSchema.Types.Mixed;
    url: string;
}
export declare class Product<P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    client: P extends IRaw ? mongoose.Types.ObjectId : Client;
    clientType: EClientType;
    isApprovedForWeb: boolean;
    isActive: boolean;
    futureOrdersFromClient: number;
    sellBarcode: string;
    barcode: string;
    clientBarcode: string;
    priceHistory: number[];
    costPrice: number;
    sellPrice: number;
    discountPrice: number;
    hasQty: boolean;
    qty: number;
    containerQty: number;
    isDisplay: boolean;
    displayQty: number;
    name: string;
    category: string;
    subCategory: string;
    shippingPrice: number;
    qtyType: EQtyType;
    description: string;
    mainImage: string;
    mainImageSize: string;
    images: string[];
    priceListName: string;
    updatedAt: string;
    createdAt: string;
    lastUpdate: string;
    fail: ProductFail[];
    lastSending: Map<string, string>;
    needImageCompression: boolean;
    hasBeenCompressed: boolean;
    compressedImageUrl: string;
    thirdPartyIds: Map<string, string>;
}
export declare const ProductSchema: mongoose.Schema<Product<IRaw | IPopulated>, mongoose.Model<Product<IRaw | IPopulated>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product<IRaw | IPopulated>>;
