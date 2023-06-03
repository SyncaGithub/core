import { Connection, Model } from "mongoose";
import { LogDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface ILogRepo extends IBaseRepo<LogDocument> {
}
export declare class LogRepo extends BaseRepo<LogDocument> {
    constructor(connection: Connection, jobModel: Model<LogDocument>);
}
