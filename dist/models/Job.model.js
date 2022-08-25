"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSchema = void 0;
const mongoose_1 = require("mongoose");
const jobs_enums_1 = require("../types/jobs.enums");
exports.JobSchema = new mongoose_1.Schema({
    actions: { type: [String], enum: jobs_enums_1.EActionType, required: true },
    actionList: [
        {
            clientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Client" },
            action: { type: String, enum: jobs_enums_1.EActionType, required: true },
        },
    ],
    status: { type: String, enum: jobs_enums_1.EJobStatus, default: jobs_enums_1.EJobStatus.STOPED },
    startHour: { type: String, required: true },
    startMinute: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    configuration: {
        clientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Client" },
        isFullFetch: Boolean,
        isDisplayOnly: Boolean,
    },
    jobHistoryId: String,
}, { timestamps: true, versionKey: false });
//# sourceMappingURL=Job.model.js.map