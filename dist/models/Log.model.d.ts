import mongoose, { Document } from "mongoose";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
export type LogDocument<P extends IPopulated | IRaw = IRaw> = Log<P> & Document;
export declare class Log<P extends IPopulated | IRaw = IRaw> {
    status?: string;
    requestHeaders?: any;
    requestPayload?: any;
    responsePayload?: any;
    responseStatusCode?: any;
    url: string;
    method: string;
    startTime: number;
    endTime: number;
    success: boolean;
    user: P extends IRaw ? mongoose.Types.ObjectId : User;
}
export declare const LogSchema: mongoose.Schema<Log<IPopulated | IRaw>, mongoose.Model<Log<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Log<IPopulated | IRaw>>;
