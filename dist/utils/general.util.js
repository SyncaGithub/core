"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeInIsraelTimezone = exports.obsToPromise = void 0;
const rxjs_1 = require("rxjs");
// Utills
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
const getTimeInIsraelTimezone = () => {
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
    return tempDate;
};
exports.getTimeInIsraelTimezone = getTimeInIsraelTimezone;
//# sourceMappingURL=general.util.js.map