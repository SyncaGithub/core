import { Schema, Model, Document, Types } from "mongoose";
import { EClientType, EQtyType } from "../types/tempEnums";
export interface IProduct extends Document {
    userId: Types.ObjectId;
    clientId: Types.ObjectId;
    clientType: EClientType;
    futureOrdersFromClient?: number;
    sellBarcode: string;
    barcode: string;
    clientBarcode: string;
    priceHistory?: number[];
    costPrice: number;
    sellPrice: number;
    discountPrice?: number;
    qty: number;
    containerQty?: number;
    isDisplay?: boolean;
    displayQty?: number;
    name: string;
    category: string;
    subCategory?: string;
    shipingPrice?: number;
    qtyType: EQtyType;
    description?: string;
    mainImage: string;
    images?: string[];
    priceListName?: string;
    updatedAt?: string;
    createdAt?: string;
    fail: {
        clientId: Types.ObjectId;
        config?: any;
        data?: any;
        url?: string;
    }[];
    lastSending?: Map<string, string>;
    needImageCompression: boolean;
    hasBennCompressed: boolean;
}
export declare const ProductSchema: Schema<IProduct, Model<IProduct, {}, {}, {}, any>, {}, {}, {}, {}, "type", IProduct>;
//# sourceMappingURL=Product.model.d.ts.map