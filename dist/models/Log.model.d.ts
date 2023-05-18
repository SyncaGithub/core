import mongoose, { Document } from "mongoose";
import { IPopulated, IRaw } from "./types";
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
}
export declare const LogSchema: mongoose.Schema<Log<IPopulated | IRaw>, mongoose.Model<Log<IPopulated | IRaw>, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Log<IPopulated | IRaw>>;
//# sourceMappingURL=Log.model.d.ts.map