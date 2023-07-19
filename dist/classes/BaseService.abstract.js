"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const rxjs_1 = require("rxjs");
const types_1 = require("../types");
const luxon_1 = require("luxon");
class BaseService {
    constructor(productRepo, clientRepo, queueClient) {
        this._productRepo = productRepo;
        this._clientRepo = clientRepo;
        this._queueClient = queueClient;
    }
    async handleAction(job, cb, config) {
        let client;
        const type = job.actionList[job.currentActionIndex].action;
        try {
            client = await this._clientRepo.findOne({
                user: job.user,
                _id: job.actionList[job.currentActionIndex].client
            });
        }
        catch (error) {
            return Promise.reject(`Cannot find client with id: ${job.actionList[job.currentActionIndex].client}`);
        }
        try {
            if (config.isClientStatusAffected) {
                await client.startWorking();
            }
            this._logger.debug(`
Start Action: ${type} | Client: ${client.nickname} (${client._id})
Action Index: ${job.currentActionIndex}
            `);
            const lastUpdate = luxon_1.DateTime.local({ zone: process.env.TZ });
            const response = await cb(lastUpdate, client);
            if (config.isClientStatusAffected) {
                if (config.isClientUpdateTimeAffected) {
                    await client.finishWorking(lastUpdate.toISO());
                }
                else {
                    await client.finishWorking();
                }
            }
            this._logger.debug(`Action Success: ${type}`);
            this.finishJob(job, type, Object.assign(Object.assign({}, response.jobHistoryUpdate), { status: types_1.EActionStatus.SUCCESS }));
            return Promise.resolve(response.result);
        }
        catch (error) {
            this._logger.error(error);
            if (client) {
                client.status = types_1.EntityStatus.CRASHED;
                await client.save();
            }
            this._logger.error(`Action Failed: ${type}`);
            this.finishJob(job, type, {
                status: types_1.EActionStatus.FAILED,
                error: typeof error === 'string'
                    ? error
                    : (error === null || error === void 0 ? void 0 : error.message)
                        ? error === null || error === void 0 ? void 0 : error.message
                        : JSON.stringify(error, null, 4)
            });
            return Promise.reject(error);
        }
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