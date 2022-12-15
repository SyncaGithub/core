import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { EClientType, EntityStatus, IRawPriorityProduct } from "../types";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";

export type ClientDocument<
	T = ClientConfigurationTypes,
	P extends IPopulated | IRaw = IRaw
> = Client<T, P> & Document & ClientMethods;

export interface ClientMethods {
	isClientBusy: () => Promise<boolean>;
}

export type ClientConfigurationTypes =
	| PriorityClientConfiguration
	| CashcowClientConfiguration;

export class CashcowClientConfiguration {
	@Prop()
	store_id: number;

	@Prop()
	token: string;
}

export class PriorityProductFilter {
	@Prop()
	key: string;

	@Prop()
	value: string;

	@Prop()
	operator: string;
}

export class PriorityClientConfiguration {
	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	baseUrl: string;

	@Prop()
	agentName: string;

	@Prop()
	paymentCode: string;

	@Prop()
	cashNumber: string;

	@Prop()
	customerNumber: string;

	@Prop()
	productsEndPoint: string;

	@Prop()
	invoiceEndPoint: string;

	@Prop()
	ordersEndPoint: string;

	@Prop()
	priceKey: string;

	@Prop([PriorityProductFilter])
	getProductsFilters: PriorityProductFilter[];

	@Prop()
	getProductsExpand: string;

	@Prop()
	getProductsSelect: string;

	@Prop({ type: MongooseSchema.Types.Mixed })
	productMap: any;

	@Prop()
	isUsingSummaryPage: boolean;

	@Prop()
	usingWARHSNAME: string;
}

@Schema({ timestamps: true })
export class Client<
	T = ClientConfigurationTypes,
	P extends IPopulated | IRaw = IRaw
> {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	user: P extends IRaw ? mongoose.Types.ObjectId : User;

	@Prop({ type: String, enum: EntityStatus, default: EntityStatus.READY })
	status: EntityStatus;

	@Prop({ type: String, enum: EClientType, required: true })
	clientType: EClientType;

	@Prop({ type: mongoose.Schema.Types.Mixed })
	configuration: T;

	@Prop(PriorityClientConfiguration)
	priority: PriorityClientConfiguration;

	@Prop(CashcowClientConfiguration)
	cashcow: CashcowClientConfiguration;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }])
	workWithClients: Client[];

	@Prop()
	nickname: string;

	@Prop()
	barcodeTag: string;

	@Prop()
	sellPriceMultiple: number;

	@Prop()
	sellPriceFormula: string;

	@Prop()
	minPriceForFreeDelivery: number;

	@Prop()
	deliveryBarcode: string;

	@Prop()
	lastUpdate: string;

	@Prop()
	isTempCategory: boolean;

	@Prop()
	tempCategory: string;

	@Prop()
	isUsingWhiteList: boolean;

	@Prop([String])
	whiteListProducts: mongoose.Types.ObjectId[];

	@Prop()
	isUsingBlackList: boolean;

	@Prop([String])
	blackListProducts: mongoose.Types.ObjectId[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);

ClientSchema.methods.isClientBusy = async function (): Promise<boolean> {
	if (this.status === EntityStatus.WORKING) {
		return Promise.reject("Client is busy");
	} else {
		return Promise.resolve(false);
	}
};
