import mongoose, { Document } from "mongoose";
import { ECashcowOrderStatus, IOrder } from "../types";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export declare type JobDocument<P extends IPopulated | IRaw = IRaw> = Job<P> & Document;
export declare class Action<P extends IPopulated | IRaw = IRaw> {
    client: P extends IRaw ? mongoose.Types.ObjectId : Client;
    action: string;
}
export declare class JobConfiguration<P extends IPopulated | IRaw = IRaw> {
    client: P extends IRaw ? mongoose.Types.ObjectId : Client;
    isFullFetch: boolean;
    isDisplayOnly: boolean;
    startNow: boolean;
    sellerClientId: mongoose.Types.ObjectId;
    orders?: IOrder[];
    cashcowOrderStatus: ECashcowOrderStatus;
}
export declare class Job<P extends IPopulated | IRaw = IRaw> {
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
    actionList: Action[];
    status: string;
    startHour: string;
    startMinute: string;
    jobHistoryId: string;
    configuration: JobConfiguration;
    currentActionHistoryId?: string;
    currentActinIndex: number;
}
export declare const JobSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
//# sourceMappingURL=Job.model.d.ts.map