import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Product, ProductDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface IProductRepo extends IBaseRepo<ProductDocument> {}

@Injectable()
export class ProductRepo extends BaseRepo<ProductDocument> {
	constructor(
		@InjectConnection() connection: Connection,
		@InjectModel(Product.name) productModel: Model<ProductDocument>
	) {
		super(connection, productModel);
	}
}
