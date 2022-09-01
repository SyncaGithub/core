import { Connection, Model } from "mongoose";
import { ProductDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IProductRepo extends IBaseRepo<ProductDocument> {
    generateHashTableFromProductsList(products: ProductDocument[], primaryKey?: string): {
        [key: string]: ProductDocument;
    };
}
export declare class ProductRepo extends BaseRepo<ProductDocument> {
    private readonly connection;
    private readonly productModel;
    constructor(connection: Connection, productModel: Model<ProductDocument>);
    generateHashTableFromProductsList(products: ProductDocument[], primaryKey?: string): {
        [key: string]: ProductDocument;
    };
}
//# sourceMappingURL=Product.repo.d.ts.map