"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECashcowOrderStatus = exports.EQtyType = exports.EClientType = void 0;
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