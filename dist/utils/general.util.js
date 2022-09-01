"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obsToPromise = void 0;
const rxjs_1 = require("rxjs");
// Utills
const obsToPromise = (obs) => {
    return new Promise((resolve, reject) => {
        obs.pipe((0, rxjs_1.take)(1)).subscribe({
            error: (err) => reject(err),
            next: (res) => resolve(res.data),
        });
    });
};
exports.obsToPromise = obsToPromise;
//# sourceMappingURL=general.util.js.map