import mongoose, { Document } from "mongoose";
import { EActionStatus } from "../types/jobs.enums";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export type JobHistoryDocument<P extends IPopulated | IRaw = IRaw> = JobHistory<P> & Document;
export declare class JobHistory<P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    dateStart: string;
    actionType: string;
    dateEnd: string;
    status: EActionStatus;
    modifiedCount: number;
    failedCount: number;
    maxModifiedCount: number;
    error: String;
}
export declare const JobHistorySchema: mongoose.Schema<JobHistory<IRaw | IPopulated>, mongoose.Model<JobHistory<IRaw | IPopulated>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, JobHistory<IRaw | IPopulated>>;
