"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECashcowOrderStatus = exports.ECashcowAddOrUpdateQtyType = void 0;
var ECashcowAddOrUpdateQtyType;
(function (ECashcowAddOrUpdateQtyType) {
    ECashcowAddOrUpdateQtyType[ECashcowAddOrUpdateQtyType["Units"] = 0] = "Units";
    ECashcowAddOrUpdateQtyType[ECashcowAddOrUpdateQtyType["Kg"] = 1] = "Kg";
    ECashcowAddOrUpdateQtyType[ECashcowAddOrUpdateQtyType["Grams"] = 2] = "Grams";
    ECashcowAddOrUpdateQtyType[ECashcowAddOrUpdateQtyType["Liter"] = 3] = "Liter";
    ECashcowAddOrUpdateQtyType[ECashcowAddOrUpdateQtyType["Meter"] = 4] = "Meter";
    ECashcowAddOrUpdateQtyType[ECashcowAddOrUpdateQtyType["Cm"] = 5] = "Cm";
})(ECashcowAddOrUpdateQtyType = exports.ECashcowAddOrUpdateQtyType || (exports.ECashcowAddOrUpdateQtyType = {}));
var ECashcowOrderStatus;
(function (ECashcowOrderStatus) {
    ECashcowOrderStatus[ECashcowOrderStatus["PhoneBankTransfer"] = 1] = "PhoneBankTransfer";
    ECashcowOrderStatus[ECashcowOrderStatus["Lead"] = 2] = "Lead";
    ECashcowOrderStatus[ECashcowOrderStatus["Paid"] = 4] = "Paid";
    ECashcowOrderStatus[ECashcowOrderStatus["Error"] = 5] = "Error";
    ECashcowOrderStatus[ECashcowOrderStatus["Delivered"] = 6] = "Delivered";
    ECashcowOrderStatus[ECashcowOrderStatus["PendingReview"] = 7] = "PendingReview";
    ECashcowOrderStatus[ECashcowOrderStatus["Canceled"] = 8] = "Canceled";
    ECashcowOrderStatus[ECashcowOrderStatus["Claimed"] = 9] = "Claimed";
})(ECashcowOrderStatus = exports.ECashcowOrderStatus || (exports.ECashcowOrderStatus = {}));
//# sourceMappingURL=cashcow.enums.js.map