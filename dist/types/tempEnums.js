"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECashcowOrderStatus = exports.EQtyType = exports.EClientType = exports.EActionType = exports.EJobStatus = exports.EActionStatus = exports.EntityStatus = void 0;
var EntityStatus;
(function (EntityStatus) {
    EntityStatus["WORKING"] = "WORKING";
    EntityStatus["CRASHED"] = "CRASHED";
    EntityStatus["READY"] = "READY";
})(EntityStatus = exports.EntityStatus || (exports.EntityStatus = {}));
var EActionStatus;
(function (EActionStatus) {
    EActionStatus["FAILED"] = "FAILED";
    EActionStatus["SUCCESS"] = "SUCCESS";
})(EActionStatus = exports.EActionStatus || (exports.EActionStatus = {}));
var EJobStatus;
(function (EJobStatus) {
    EJobStatus["RUNNING"] = "RUNNING";
    EJobStatus["STOPED"] = "STOPED";
})(EJobStatus = exports.EJobStatus || (exports.EJobStatus = {}));
var EActionType;
(function (EActionType) {
    EActionType["PRIORITY_SEND_ORDER"] = "PRIORITY_SEND_ORDER";
    EActionType["PRIORITY_SEND_INVOICE"] = "PRIORITY_SEND_INVOICE";
    EActionType["PRIORITY_FETCH_PRODUCTS"] = "PRIORITY_FETCH_PRODUCTS";
    EActionType["PRIORITY_LOAD_EXCEL"] = "PRIORITY_LOAD_EXCEL";
    EActionType["CASHCOW_FETCH_ORDER"] = "CASHCOW_FETCH_ORDER";
    EActionType["CASHCOW_FETCH_TOTALORDER"] = "CASHCOW_FETCH_TOTALORDER";
    EActionType["CASHCOW_SEND_PRODUCTS"] = "CASHCOW_SEND_PRODUCTS";
    EActionType["CASHCOW_LOAD_EXCEL"] = "CASHCOW_LOAD_EXCEL";
    EActionType["IMAGE_COMPRESSION"] = "IMAGE_COMPRESSION";
})(EActionType = exports.EActionType || (exports.EActionType = {}));
var EClientType;
(function (EClientType) {
    EClientType["PRIORITY"] = "PRIORITY";
    EClientType["CASHCOW"] = "CASHCOW";
})(EClientType = exports.EClientType || (exports.EClientType = {}));
var EQtyType;
(function (EQtyType) {
    EQtyType["UNIT"] = "UNIT";
    EQtyType["BOX"] = "BOX";
})(EQtyType = exports.EQtyType || (exports.EQtyType = {}));
var ECashcowOrderStatus;
(function (ECashcowOrderStatus) {
    ECashcowOrderStatus[ECashcowOrderStatus["PhoneBankTransfer"] = 1] = "PhoneBankTransfer";
    ECashcowOrderStatus[ECashcowOrderStatus["Lead"] = 2] = "Lead";
    ECashcowOrderStatus[ECashcowOrderStatus["Paid"] = 4] = "Paid";
    ECashcowOrderStatus[ECashcowOrderStatus["Error"] = 5] = "Error";
    ECashcowOrderStatus[ECashcowOrderStatus["Delivered"] = 6] = "Delivered";
    ECashcowOrderStatus[ECashcowOrderStatus["PendingReview"] = 7] = "PendingReview";
    ECashcowOrderStatus[ECashcowOrderStatus["Cancaled"] = 8] = "Cancaled";
    ECashcowOrderStatus[ECashcowOrderStatus["Claimed"] = 9] = "Claimed";
})(ECashcowOrderStatus = exports.ECashcowOrderStatus || (exports.ECashcowOrderStatus = {}));
//# sourceMappingURL=tempEnums.js.map