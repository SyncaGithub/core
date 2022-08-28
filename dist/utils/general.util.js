"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPromise = void 0;
const rxjs_1 = require("rxjs");
// Utills
const toPromise = (obs) => {
    return new Promise((resolve, reject) => {
        obs.pipe((0, rxjs_1.take)(1)).subscribe({
            error: (err) => reject(err),
            next: (res) => resolve(res.data),
        });
    });
};
exports.toPromise = toPromise;
//# sourceMappingURL=general.util.js.map