import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Product, ProductDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface IProductRepo extends IBaseRepo<ProductDocument> {
	generateHashTableFromProductsList(
		products: ProductDocument[],
		primaryKey?: string
	): { [key: string]: ProductDocument };
}

@Injectable()
export class ProductRepo extends BaseRepo<ProductDocument> {
	constructor(
		@InjectConnection() private readonly connection: Connection,
		@InjectModel(Product.name)
		private readonly productModel: Model<ProductDocument>
	) {
		super(connection, productModel);
	}

	generateHashTableFromProductsList(
		products: ProductDocument[],
		primaryKey: string = "barcode"
	): { [key: string]: ProductDocument } {
		return products.reduce(
			(obj, item) => Object.assign(obj, { [item[primaryKey]]: item }),
			{}
		);
	}
}
