"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getISOInIsraelTimezone = exports.obsToPromise = exports.arrayToChunkArray = exports.get = exports.delay = void 0;
const rxjs_1 = require("rxjs");
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve();
        }, ms);
    });
}
exports.delay = delay;
function get(object, path, defval = null, paths = []) {
    if (path === undefined)
        return defval;
    if (typeof path === 'object') {
        if (path.length === 0)
            return defval;
        const temp = path.shift();
        paths = path;
        path = temp;
    }
    if (typeof path === "string")
        path = path.split(".");
    const res = path.reduce((xs, x) => (typeof xs !== "string" && xs !== undefined && xs[x] !== undefined ? xs[x] : defval), object);
    if (res === defval && path.length > 0)
        return get(object, paths.shift(), defval, paths);
    return res;
}
exports.get = get;
function arrayToChunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const end = Math.min(i + chunkSize, array.length);
        chunks.push(array.slice(i, end));
    }
    return chunks;
}
exports.arrayToChunkArray = arrayToChunkArray;
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