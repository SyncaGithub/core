/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
export declare const JobHistorySchema: mongoose.Schema<JobHistory<IPopulated | IRaw>, mongoose.Model<JobHistory<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, JobHistory<IPopulated | IRaw>>;
