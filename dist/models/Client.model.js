"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
exports.ClientSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: types_1.EntityStatus,
        default: types_1.EntityStatus.READY,
    },
    workWithClients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Client" }],
    clientType: { type: String, enum: types_1.EClientType, required: true },
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
        productMap: mongoose_1.Schema.Types.Mixed,
        getProductsExpand: String,
        getProductsSelect: String,
    },
    cashcow: {
        token: String,
        store_id: Number,
    },
    isUsingWhiteList: { type: Boolean, default: false },
    whiteListProducts: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
    isUsingBlackList: { type: Boolean, default: false },
    blackListProducts: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
}, { timestamps: true, versionKey: false });
exports.ClientSchema.methods.isClientBusy = async function () {
    if (this.status === types_1.EntityStatus.WORKING) {
        return Promise.reject("Client is busy");
    }
    else {
        return Promise.resolve(false);
    }
};
//# sourceMappingURL=Client.model.js.map