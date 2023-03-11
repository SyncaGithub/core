"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getISOInIsraelTimezone = exports.obsToPromise = exports.get = void 0;
const rxjs_1 = require("rxjs");
// Utills
function get(object, path, defval = null) {
    if (typeof path === "string")
        path = path.split(".");
    return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object);
}
exports.get = get;
const obsToPromise = (obs) => {
    return new Promise((resolve, reject) => {
        obs.pipe((0, rxjs_1.take)(1), (0, rxjs_1.catchError)((e) => {
            resolve(e);
            throw e;
        }), (0, rxjs_1.tap)((res) => {
            return resolve(res);
        }));
    });
};
exports.obsToPromise = obsToPromise;
const getISOInIsraelTimezone = () => {
    const tempDate = new Date();
    const currentMonth = tempDate.getMonth() + 1;
    const currentDay = tempDate.getDay() + 1;
    let isSummer = false;
    if (currentMonth >= 3 && currentMonth <= 10) {
        isSummer = true;
        if (currentMonth === 3 && currentDay < 24) {
            isSummer = false;
        }
        if (currentMonth === 10 && currentDay > 29) {
            isSummer = false;
        }
    }
    const hoursOffset = isSummer ? 3 : 2;
    tempDate.setHours(tempDate.getHours() + hoursOffset);
    return tempDate.toISOString();
};
exports.getISOInIsraelTimezone = getISOInIsraelTimezone;
//# sourceMappingURL=general.util.js.map