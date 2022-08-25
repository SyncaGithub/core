"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
exports.ProductSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    clientType: { type: String, enum: types_1.EClientType, required: true },
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
    qtyType: { type: String, enum: types_1.EQtyType },
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Client",
                    required: true,
                },
                data: mongoose_1.Schema.Types.Mixed,
                config: mongoose_1.Schema.Types.Mixed,
                url: String,
            },
        ],
        default: [],
    },
    lastSending: { type: mongoose_1.Schema.Types.Map, of: String },
    needImageCompression: Boolean,
    hasBennCompressed: Boolean,
}, { timestamps: false, versionKey: false });
exports.ProductSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.lastSending = new Map();
    }
    next();
});
//# sourceMappingURL=Product.model.js.map