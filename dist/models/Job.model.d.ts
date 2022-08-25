import { Document, Model, Schema, Types } from "mongoose";
import { ECashcowOrderStatus, IOrder } from "../types";
import { EActionType, EJobStatus } from "../types/jobs.enums";
export interface IJob extends Document {
    _id: string;
    actions: EActionType[];
    actionList: {
        action: EActionType;
        clientId: Types.ObjectId;
    }[];
    startHour: string;
    startMinute: string;
    status: EJobStatus;
    userId: Types.ObjectId;
    configuration: {
        clientId: Types.ObjectId;
        isFullFetch: boolean;
        isDisplayOnly: boolean;
        startNow: boolean;
        sellerClientId: Types.ObjectId;
        orders?: IOrder[];
        cashcowOrderStatus: ECashcowOrderStatus;
    };
    jobHistoryId?: string;
    currentActionHistoryId?: string;
    currentActinIndex: number;
}
export interface IJobModel extends Model<IJob> {
}
export declare const JobSchema: Schema<IJob, IJobModel, {}, {}, {}, {}, "type", IJob>;
//# sourceMappingURL=Job.model.d.ts.map