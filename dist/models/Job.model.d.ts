import mongoose, { Document, ObjectId } from "mongoose";
import { ECashcowOrderStatus, IOrder } from "../types";
import { EActionType } from "../types/jobs.enums";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export type JobDocument<P extends IPopulated | IRaw = IRaw> = Job<P> & Document;
export declare class Action<P extends IPopulated | IRaw = IRaw> {
    client: P extends IRaw ? ObjectId : Client;
    action: EActionType;
}
export declare const JobActionSchema: mongoose.Schema<Action<IPopulated | IRaw>, mongoose.Model<Action<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Action<IPopulated | IRaw>>;
export declare class JobConfiguration<P extends IPopulated | IRaw = IRaw> {
    client?: P extends IRaw ? ObjectId : Client;
    isFullFetch?: boolean;
    isDisplayOnly?: boolean;
    startNow?: boolean;
    sellerClientId?: mongoose.Schema.Types.ObjectId | string;
    orders?: IOrder[];
    cashcowOrderStatus?: ECashcowOrderStatus;
}
export declare class Job<P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    actionList: Action[];
    status?: string;
    startHour: string;
    startMinute: string;
    jobHistoryId?: string;
    configuration?: JobConfiguration;
    currentActionHistoryId?: string;
    currentActionIndex: number;
}
export declare const JobSchema: mongoose.Schema<Job<IPopulated | IRaw>, mongoose.Model<Job<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Job<IPopulated | IRaw>>;
