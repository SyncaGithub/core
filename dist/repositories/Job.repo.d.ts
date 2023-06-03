import { Connection, Model } from "mongoose";
import { JobDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IJobRepo extends IBaseRepo<JobDocument> {
}
export declare class JobRepo extends BaseRepo<JobDocument> {
    constructor(connection: Connection, jobModel: Model<JobDocument>);
}
