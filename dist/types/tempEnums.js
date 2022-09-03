"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EInject = exports.ECashcowOrderStatus = exports.EQtyType = void 0;
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
var EInject;
(function (EInject) {
    EInject["Queue"] = "QUEUE_SERVICE";
})(EInject = exports.EInject || (exports.EInject = {}));
//# sourceMappingURL=tempEnums.js.map