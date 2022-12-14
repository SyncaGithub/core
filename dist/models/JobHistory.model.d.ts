import mongoose, { Document } from "mongoose";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export type JobHistoryDocument<P extends IPopulated | IRaw = IRaw> = JobHistory<P> & Document;
export declare class JobHistory<P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    dateStart: string;
    actionType: string;
    dateEnd: string;
    status: string;
    modifiedCount: number;
    failedCount: number;
    maxModifiedCount: number;
    error: String;
}
export declare const JobHistorySchema: mongoose.Schema<JobHistory<IPopulated | IRaw>, mongoose.Model<JobHistory<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, JobHistory<IPopulated | IRaw>>;
//# sourceMappingURL=JobHistory.model.d.ts.map