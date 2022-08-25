"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobHistorySchema = void 0;
const mongoose_1 = require("mongoose");
const jobs_enums_1 = require("../types/jobs.enums");
exports.JobHistorySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    dateStart: { type: String, required: true },
    actionType: { type: String, enum: jobs_enums_1.EActionType, required: true },
    dateEnd: { type: String },
    status: { type: String, enum: jobs_enums_1.EActionStatus },
    modifiedCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    maxModifiedCount: { type: Number, default: 0 },
    error: String,
}, { versionKey: false });
//# sourceMappingURL=JobHistory.model.js.map