"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const rxjs_1 = require("rxjs");
class BaseService {
    constructor(productRepo, clientRepo, queueClient) {
        this._queueClient = queueClient;
    }
    finishJob(job, jobActionType, jobHistory) {
        this._queueClient
            .send('jobFinish', {
            actionStatus: jobHistory.status,
            job,
            finishedJob: jobActionType,
            jobHistoryData: jobHistory
        })
            .pipe((0, rxjs_1.take)(1))
            .subscribe();
    }
    updateJobHistory(jobHistoryUpdate) {
        this._queueClient
            .send('updateJobHistory', jobHistoryUpdate)
            .pipe((0, rxjs_1.take)(1))
            .subscribe();
    }
    updateJobHistoryCounters(jobHistoryUpdate) {
        this._queueClient
            .send('updateJobHistoryCounters', jobHistoryUpdate)
            .pipe((0, rxjs_1.take)(1))
            .subscribe();
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.abstract.js.map