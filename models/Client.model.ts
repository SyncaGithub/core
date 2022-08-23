import { Document, Model, Schema, Types } from "mongoose";
import { EntityStatus, EClientType } from "../types";

export interface IClient extends Document {
	userId: Types.ObjectId;
	status: EntityStatus;
	clientType: EClientType;
	workWithClients: Types.ObjectId[];
	nickname: string;
	barcodeTag: string;
	sellPriceMultiple: number;
	sellPriceFormula: string;
	lastUpdate: string;
	isTempCategory: boolean;
	tempCategory: string;
	priority: {
		username: string;
		password: string;
		baseUrl: string;
		agentName: string;
		paymentCode: string;
		cashNumber: string;
		customerNumber: string;
		productsEndPoint: string;
		invoiceEndPoint: string;
		ordersEndPoint: string;
		priceKey: string;
		getProductsFilters: { key: string; value: string; operator: string }[];
		getProductsExpand: string;
		getProductsSelect: string;
		productMap: { [key: string]: string };
	};
	cashcow: {
		store_id: number;
		token: string;
	};
	isUsingWhiteList: boolean;
	whiteListProducts: Types.ObjectId[];
	isUsingBlackList: boolean;
	blackListProducts: Types.ObjectId[];
	isClientBusy: () => Promise<boolean>;
}

export interface IClientModel extends Model<IClient> {
	isClientBusy: () => Promise<boolean>;
}

export const ClientSchema = new Schema<IClient, IClientModel, IClientModel>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		status: {
			type: String,
			enum: EntityStatus,
			default: EntityStatus.READY,
		},
		workWithClients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
		clientType: { type: String, enum: EClientType, required: true },
		nickname: { type: String, required: true },
		barcodeTag: String,
		sellPriceMultiple: { type: Number, default: 1 },
		sellPriceFormula: String,
		lastUpdate: String,
		isTempCategory: { type: Boolean, default: false },
		tempCategory: { type: String, default: "זמני" },
		priority: {
			username: String,
			password: String,
			baseUrl: String,
			agentName: String,
			paymentCode: String,
			cashNumber: String,
			customerNumber: String,
			productsEndPoint: String,
			invoiceEndPoint: String,
			ordersEndPoint: String,
			priceKey: String,
			getProductsFilters: [
				{ key: String, value: String, operator: String },
			],
			productMap: Schema.Types.Mixed,
			getProductsExpand: String,
			getProductsSelect: String,
		},
		cashcow: {
			token: String,
			store_id: Number,
		},
		isUsingWhiteList: { type: Boolean, default: false },
		whiteListProducts: [
			{ type: Schema.Types.ObjectId, ref: "Product", default: [] },
		],
		isUsingBlackList: { type: Boolean, default: false },
		blackListProducts: [
			{ type: Schema.Types.ObjectId, ref: "Product", default: [] },
		],
	},
	{ timestamps: true, versionKey: false }
);

ClientSchema.methods.isClientBusy = async function (): Promise<boolean> {
	if (this.status === EntityStatus.WORKING) {
		return Promise.reject("Client is busy");
	} else {
		return Promise.resolve(false);
	}
};
