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
