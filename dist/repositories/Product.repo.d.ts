import { Connection, Model } from "mongoose";
import { ProductDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IProductRepo extends IBaseRepo<ProductDocument> {
}
export declare class ProductRepo extends BaseRepo<ProductDocument> {
    constructor(connection: Connection, productModel: Model<ProductDocument>);
}
//# sourceMappingURL=Product.repo.d.ts.map