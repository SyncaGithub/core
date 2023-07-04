"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericConverter = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
class GenericConverter {
    static convertProductToSyncaFormat(rawProduct, client, lastUpdateISO) {
        var _a;
        const temp = {};
        for (let key in client.genericApi.productMap) {
            temp[key] = (0, utils_1.get)(rawProduct, Array.from((_a = client.genericApi.productMap[key]) !== null && _a !== void 0 ? _a : []), undefined);
        }
        temp.lastUpdate = lastUpdateISO;
        temp.client = client._id;
        temp.user = client.user;
        temp.clientType = types_1.EClientType.GENERIC;
        temp.sellPrice = Number(temp.sellPrice);
        return temp;
    }
}
exports.GenericConverter = GenericConverter;
//# sourceMappingURL=GenericApi.converter.js.map