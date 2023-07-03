"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = exports.Client = exports.PriorityClientConfiguration = exports.PriorityProductFilter = exports.GenericApiClientConfiguration = exports.WooCommerceClientConfiguration = exports.CashcowClientConfiguration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../types");
class CashcowClientConfiguration {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CashcowClientConfiguration.prototype, "store_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CashcowClientConfiguration.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], CashcowClientConfiguration.prototype, "keysToIgnoreInExistingProduct", void 0);
exports.CashcowClientConfiguration = CashcowClientConfiguration;
class WooCommerceClientConfiguration {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WooCommerceClientConfiguration.prototype, "apiUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WooCommerceClientConfiguration.prototype, "consumer_key", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WooCommerceClientConfiguration.prototype, "consumer_secret", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], WooCommerceClientConfiguration.prototype, "keysToIgnoreInExistingProduct", void 0);
exports.WooCommerceClientConfiguration = WooCommerceClientConfiguration;
class GenericApiClientConfiguration {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GenericApiClientConfiguration.prototype, "apiUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], GenericApiClientConfiguration.prototype, "productMap", void 0);
exports.GenericApiClientConfiguration = GenericApiClientConfiguration;
class PriorityProductFilter {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityProductFilter.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityProductFilter.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityProductFilter.prototype, "operator", void 0);
exports.PriorityProductFilter = PriorityProductFilter;
class PriorityClientConfiguration {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "baseUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "agentName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "paymentCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "cashNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "customerNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "productsEndPoint", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "invoiceEndPoint", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "ordersEndPoint", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "priceKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PriorityClientConfiguration.prototype, "minQty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], PriorityClientConfiguration.prototype, "productsBadStatuses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: types_1.EProductSellProperty, type: String, default: types_1.EProductSellProperty.BARCODE }),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "sellBarcodeKey", void 0);
__decorate([
    (0, mongoose_1.Prop)([PriorityProductFilter]),
    __metadata("design:type", Array)
], PriorityClientConfiguration.prototype, "getProductsFilters", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "getProductsExpand", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PriorityClientConfiguration.prototype, "getProductsSelect", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], PriorityClientConfiguration.prototype, "productMap", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], PriorityClientConfiguration.prototype, "isUsingSummaryPage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], PriorityClientConfiguration.prototype, "isRemovingOrdersFromQty", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], PriorityClientConfiguration.prototype, "usingWARHSNAME", void 0);
exports.PriorityClientConfiguration = PriorityClientConfiguration;
let Client = class Client {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", Object)
], Client.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.EntityStatus, default: types_1.EntityStatus.READY }),
    __metadata("design:type", String)
], Client.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.EClientType, required: true }),
    __metadata("design:type", String)
], Client.prototype, "clientType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], Client.prototype, "configuration", void 0);
__decorate([
    (0, mongoose_1.Prop)(PriorityClientConfiguration),
    __metadata("design:type", PriorityClientConfiguration)
], Client.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)(GenericApiClientConfiguration),
    __metadata("design:type", GenericApiClientConfiguration)
], Client.prototype, "genericApi", void 0);
__decorate([
    (0, mongoose_1.Prop)(WooCommerceClientConfiguration),
    __metadata("design:type", WooCommerceClientConfiguration)
], Client.prototype, "wooCommerce", void 0);
__decorate([
    (0, mongoose_1.Prop)(CashcowClientConfiguration),
    __metadata("design:type", CashcowClientConfiguration)
], Client.prototype, "cashcow", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Client" }]),
    __metadata("design:type", Array)
], Client.prototype, "workWithClients", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Client.prototype, "nickname", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Client.prototype, "barcodeTag", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Client.prototype, "sellPriceMultiple", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Client.prototype, "sellPriceFormula", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Client.prototype, "minPriceForFreeDelivery", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Client.prototype, "deliveryBarcode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Client.prototype, "lastUpdate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Client.prototype, "isTempCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Client.prototype, "tempCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Client.prototype, "isUsingWhiteList", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Client.prototype, "whiteListProducts", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Client.prototype, "isUsingBlackList", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Client.prototype, "blackListProducts", void 0);
Client = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Client);
exports.Client = Client;
exports.ClientSchema = mongoose_1.SchemaFactory.createForClass(Client);
exports.ClientSchema.methods.startWorking = async function () {
    if (this.status === types_1.EntityStatus.WORKING) {
        throw new Error("Failed to start a job, Client already WORKING.");
    }
    try {
        this.status = types_1.EntityStatus.WORKING;
        await this.save();
        return this;
    }
    catch (e) {
        throw new Error("Failed to start a job, Failed to update client status.");
    }
};
exports.ClientSchema.methods.finishWorking = async function (updateDate) {
    if (this.status === types_1.EntityStatus.READY) {
        throw new Error("Failed to finish a job, Client already READY.");
    }
    try {
        this.status = types_1.EntityStatus.READY;
        if (updateDate) {
            this.lastUpdate = updateDate;
        }
        await this.save();
        return this;
    }
    catch (e) {
        throw new Error("Failed to start a job, Failed to update client status.");
    }
};
//# sourceMappingURL=Client.model.js.map