"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EActionStatus = exports.EActionType = void 0;
var EActionType;
(function (EActionType) {
    EActionType["PRIORITY_SEND_ORDER"] = "PRIORITY_SEND_ORDER";
    EActionType["PRIORITY_FETCH_PRODUCTS"] = "PRIORITY_FETCH_PRODUCTS";
    EActionType["PRIORITY_LOAD_EXCEL"] = "PRIORITY_LOAD_EXCEL";
    EActionType["CASHCOW_FETCH_ORDER"] = "CASHCOW_FETCH_ORDER";
    EActionType["CASHCOW_SEND_PRODUCTS"] = "CASHCOW_SEND_PRODUCTS";
    EActionType["CASHCOW_LOAD_EXCEL"] = "CASHCOW_LOAD_EXCEL";
})(EActionType = exports.EActionType || (exports.EActionType = {}));
var EActionStatus;
(function (EActionStatus) {
    EActionStatus["FAILED"] = "FAILED";
    EActionStatus["SUCCESS"] = "SUCCESS";
})(EActionStatus = exports.EActionStatus || (exports.EActionStatus = {}));
//# sourceMappingURL=auth.enums.js.map