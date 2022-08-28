"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = exports.Client = exports.PriorityClientConfiguration = exports.PriorityProductFilter = exports.CashcowClientConfiguration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
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
exports.CashcowClientConfiguration = CashcowClientConfiguration;
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
    (0, mongoose_1.Prop)(mongoose_2.Schema.Types.Mixed),
    __metadata("design:type", Object)
], PriorityClientConfiguration.prototype, "productMap", void 0);
exports.PriorityClientConfiguration = PriorityClientConfiguration;
let Client = class Client {
};
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" } }),
    __metadata("design:type", Object)
], Client.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.EntityStatus, required: true }),
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
    (0, mongoose_1.Prop)(CashcowClientConfiguration),
    __metadata("design:type", CashcowClientConfiguration)
], Client.prototype, "cashcow", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: { type: mongoose_2.default.Schema.Types.ObjectId, ref: "Client" } }]),
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
exports.ClientSchema.methods.isClientBusy = async function () {
    if (this.status === types_1.EntityStatus.WORKING) {
        return Promise.reject("Client is busy");
    }
    else {
        return Promise.resolve(false);
    }
};
//# sourceMappingURL=Client.model.js.map