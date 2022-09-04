import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Schema as MongooseSchema, Document, Types } from "mongoose";
import { EClientType, EQtyType } from "../types";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";

export type ProductDocument<P extends IPopulated | IRaw = IRaw> = Product<P> &
	Document;

export class ProductFail<P extends IPopulated | IRaw = IRaw> {
	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: "Client",
		required: true,
	})
	client: P extends IRaw ? mongoose.Types.ObjectId : Client;

	@Prop(MongooseSchema.Types.Mixed)
	data: MongooseSchema.Types.Mixed;

	@Prop()
	config?: MongooseSchema.Types.Mixed;

	@Prop()
	url: string;
}

@Schema({ timestamps: true })
export class Product<P extends IPopulated | IRaw = IRaw> {
	@Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
	user: P extends IRaw ? mongoose.Types.ObjectId : User;

	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: "Client",
		required: true,
	})
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

	@Prop([{ type: ProductFail, default: [] }])
	fail: ProductFail[];

	@Prop({ type: MongooseSchema.Types.Map, of: String, default: new Map() })
	lastSending: Map<string, string>;

	@Prop()
	needImageCompression: boolean;

	@Prop()
	hasBeenCompressed: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
