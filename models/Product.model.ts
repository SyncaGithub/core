import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Schema, Document, Types } from "mongoose";
import { EClientType, EQtyType } from "../types";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";

export type ProductDocument<P extends IPopulated | IRaw = IRaw> = Product<P> &
	Document;

export class ProductFail<P extends IPopulated | IRaw = IRaw> {
	@Prop({ type: Schema.Types.ObjectId, ref: "Client", required: true })
	client: P extends IRaw ? mongoose.Types.ObjectId : Client;

	@Prop(Schema.Types.Mixed)
	data: Schema.Types.Mixed;

	@Prop()
	config?: Schema.Types.Mixed;

	@Prop()
	url: string;
}

export class Product<P extends IPopulated | IRaw = IRaw> {
	@Prop({ type: Schema.Types.ObjectId, ref: "User", required: true })
	user: P extends IRaw ? mongoose.Types.ObjectId : User;

	@Prop({ type: Schema.Types.ObjectId, ref: "Client", required: true })
	client: P extends IRaw ? mongoose.Types.ObjectId : Client;

	@Prop({ type: String, enum: EClientType, required: true })
	clientType: EClientType;

	@Prop()
	futureOrdersFromClient: number;

	@Prop()
	sellBarcode: string;

	@Prop()
	barcode: string;

	@Prop()
	clientBarcode: string;

	@Prop([Number])
	priceHistory: number[];

	@Prop()
	costPrice: number;

	@Prop()
	sellPrice: number;

	@Prop()
	discountPrice: number;

	@Prop()
	qty: number;

	@Prop()
	containerQty: number;

	@Prop()
	isDisplay: boolean;

	@Prop()
	displayQty: number;

	@Prop()
	name: string;

	@Prop()
	category: string;

	@Prop()
	subCategory: string;

	@Prop()
	shippingPrice: number;

	@Prop({ type: String, enum: EQtyType })
	qtyType: EQtyType;

	@Prop()
	description: string;

	@Prop()
	mainImage: string;

	@Prop([String])
	images: string[];

	@Prop()
	priceListName: string;

	@Prop()
	updatedAt: string;

	@Prop()
	createdAt: string;

	@Prop({ type: [ProductFail], default: [] })
	fail: ProductFail[];

	@Prop({ type: Schema.Types.Map, of: String, default: new Map() })
	lastSending: Map<string, string>;

	@Prop()
	needImageCompression: boolean;

	@Prop()
	hasBeenCompressed: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
