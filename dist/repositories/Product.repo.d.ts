import { Connection, Model } from "mongoose";
import { ProductDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IProductRepo extends IBaseRepo<ProductDocument> {
}
export declare class ProductRepo extends BaseRepo<ProductDocument> {
    private readonly connection;
    constructor(connection: Connection, productModel: Model<ProductDocument>);
    generateHashTableFromProductsList(products: ProductDocument[], primaryKey?: string): {
        [key: string]: ProductDocument;
    };
}
//# sourceMappingURL=Product.repo.d.ts.map