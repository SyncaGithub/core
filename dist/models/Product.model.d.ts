import mongoose, { Schema, Document } from "mongoose";
import { EClientType, EQtyType } from "../types";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export declare type ProductDocument<P extends IPopulated | IRaw = IRaw> = Product<P> & Document;
export declare class ProductFail<P extends IPopulated | IRaw = IRaw> {
    client: P extends IRaw ? mongoose.Types.ObjectId : Client;
    data: Schema.Types.Mixed;
    config: Schema.Types.Mixed;
    url: string;
}
export declare class Product<P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    client: P extends IRaw ? mongoose.Types.ObjectId : Client;
    clientType: EClientType;
    futureOrdersFromClient: number;
    sellBarcode: string;
    barcode: string;
    clientBarcode: string;
    priceHistory: number[];
    costPrice: number;
    sellPrice: number;
    discountPrice: number;
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
    images: string[];
    priceListName: string;
    updatedAt: string;
    createdAt: string;
    fail: ProductFail[];
    lastSending: Map<string, string>;
    needImageCompression: boolean;
    hasBeenCompressed: boolean;
}
export declare const ProductSchema: mongoose.Schema<Product<IPopulated | IRaw>, mongoose.Model<Product<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, "type", Product<IPopulated | IRaw>>;
//# sourceMappingURL=Product.model.d.ts.map