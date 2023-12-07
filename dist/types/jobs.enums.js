"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EActionType = exports.EJobStatus = exports.EActionStatus = exports.EClientType = exports.EntityStatus = void 0;
var EntityStatus;
(function (EntityStatus) {
    EntityStatus["WORKING"] = "WORKING";
    EntityStatus["CRASHED"] = "CRASHED";
    EntityStatus["READY"] = "READY";
})(EntityStatus || (exports.EntityStatus = EntityStatus = {}));
var EClientType;
(function (EClientType) {
    EClientType["PRIORITY"] = "PRIORITY";
    EClientType["CASHCOW"] = "CASHCOW";
    EClientType["WOOCOMMERCE"] = "WOOCOMMERCE";
    EClientType["GENERIC"] = "GENERIC";
})(EClientType || (exports.EClientType = EClientType = {}));
var EActionStatus;
(function (EActionStatus) {
    EActionStatus["FAILED"] = "FAILED";
    EActionStatus["SUCCESS"] = "SUCCESS";
})(EActionStatus || (exports.EActionStatus = EActionStatus = {}));
var EJobStatus;
(function (EJobStatus) {
    EJobStatus["RUNNING"] = "RUNNING";
    EJobStatus["STOPPED"] = "STOPPED";
})(EJobStatus || (exports.EJobStatus = EJobStatus = {}));
var EActionType;
(function (EActionType) {
    EActionType["PRIORITY_SEND_ORDER"] = "PRIORITY_SEND_ORDER";
    EActionType["PRIORITY_SEND_INVOICE"] = "PRIORITY_SEND_INVOICE";
    EActionType["PRIORITY_FETCH_PRODUCTS"] = "PRIORITY_FETCH_PRODUCTS";
    EActionType["PRIORITY_PRODUCTS_LOOKUP"] = "PRIORITY_PRODUCTS_LOOKUP";
    EActionType["PRIORITY_LOAD_EXCEL"] = "PRIORITY_LOAD_EXCEL";
    EActionType["CASHCOW_FETCH_ORDER"] = "CASHCOW_FETCH_ORDER";
    EActionType["CASHCOW_FETCH_TOTALORDER"] = "CASHCOW_FETCH_TOTALORDER";
    EActionType["CASHCOW_SEND_PRODUCTS"] = "CASHCOW_SEND_PRODUCTS";
    EActionType["CASHCOW_LOAD_EXCEL"] = "CASHCOW_LOAD_EXCEL";
    EActionType["CASHCOW_UPDATE_ORDER"] = "CASHCOW_UPDATE_ORDER";
    EActionType["WOOCOMMERCE_SEND_PRODUCT"] = "WOOCOMMERCE_SEND_PRODUCT";
    EActionType["WOOCOMMERCE_ACKNOWLEDGE_PRODUCT"] = "WOOCOMMERCE_ACKNOWLEDGE_PRODUCT";
    EActionType["GENERIC_FETCH_PRODUCTS"] = "GENERIC_FETCH_PRODUCTS";
    EActionType["IMAGE_COMPRESSION"] = "IMAGE_COMPRESSION";
})(EActionType || (exports.EActionType = EActionType = {}));
//# sourceMappingURL=jobs.enums.js.map