import {Schema, Model} from 'mongoose';
import { EClientType, EQtyType } from '../../../enums';
import { IProduct } from '../../../interfaces';

export const ProductSchema = new Schema<
	IProduct,
	Model<IProduct>
>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
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
		qtyType: {type: String, enum: EQtyType},
		description: String,
		mainImage: String,
		images: [String],
		priceListName: String,
		updatedAt: String,
		createdAt: String,
		fail: {
			type: [{
				clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
				data: Schema.Types.Mixed,
				config: Schema.Types.Mixed,
				url: String
			}], default: []
		},
		lastSending: {type: Schema.Types.Map, of: String},
		needImageCompression: Boolean,
		hasBennCompressed: Boolean
	},
	{ timestamps: false, versionKey: false }
);

ProductSchema.pre<IProduct>('save', async function(next) {
    if(this.isNew){
        this.lastSending = new Map();
    }
	next();
})
