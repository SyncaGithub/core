"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericConverter = void 0;
const utils_1 = require("../utils");
class GenericConverter {
    static convertProductToSyncaFormat(rawProduct, client, lastUpdateISO) {
        var _a;
        const temp = {};
        for (let key in client.genericApi.productMap) {
            temp[key] = (0, utils_1.get)(rawProduct, Array.from((_a = client.priority.productMap.name) !== null && _a !== void 0 ? _a : []), undefined);
        }
        temp.lastUpdate = lastUpdateISO;
        temp.isApprovedForWeb = true;
        return temp;
    }
}
exports.GenericConverter = GenericConverter;
//# sourceMappingURL=GenericApi.converter.js.map