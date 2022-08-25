import { Schema, Model, Document, Types } from "mongoose";
import { EClientType, EQtyType } from "../types";

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

export const ProductSchema = new Schema<IProduct, Model<IProduct>>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		clientId: {
			type: Schema.Types.ObjectId,
			ref: "Client",
			required: true,
		},
		clientType: { type: String, enum: EClientType, required: true },
		futureOrdersFromClient: Number,
		sellBarcode: String,
		barcode: String,
		clientBarcode: String,
		priceHistory: [Number],
		costPrice: Number,
		sellPrice: Number,
		discountPrice: Number,
		qty: Number,
		containerQty: Number,
		isDisplay: Boolean,
		displayQty: Number,
		name: String,
		category: String,
		subCategory: String,
		shipingPrice: Number,
		qtyType: { type: String, enum: EQtyType },
		description: String,
		mainImage: String,
		images: [String],
		priceListName: String,
		updatedAt: String,
		createdAt: String,
		fail: {
			type: [
				{
					clientId: {
						type: Schema.Types.ObjectId,
						ref: "Client",
						required: true,
					},
					data: Schema.Types.Mixed,
					config: Schema.Types.Mixed,
					url: String,
				},
			],
			default: [],
		},
		lastSending: { type: Schema.Types.Map, of: String },
		needImageCompression: Boolean,
		hasBennCompressed: Boolean,
	},
	{ timestamps: false, versionKey: false }
);

ProductSchema.pre<IProduct>("save", async function (next) {
	if (this.isNew) {
		this.lastSending = new Map();
	}
	next();
});
