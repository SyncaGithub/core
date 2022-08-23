import { Document, Model, Schema, Types } from "mongoose";
import { EActionType, EActionStatus } from "../types";
export interface IJobHistory extends Document {
    userId: Types.ObjectId;
    dateStart: string;
    actionType: EActionType;
    dateEnd: string;
    status: EActionStatus;
    error?: string;
    modifiedCount: number;
    failedCount: number;
    maxModifiedCount: number;
}
export interface IJobHistoryModel extends Model<IJobHistory> {
}
export declare const JobHistorySchema: Schema<IJobHistory, IJobHistoryModel, {}, {}, {}, {}, "type", IJobHistory>;
//# sourceMappingURL=JobHistory.model.d.ts.map