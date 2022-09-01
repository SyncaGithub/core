import { Connection, Model } from "mongoose";
import { JobHistoryDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IJobHistoryRepo extends IBaseRepo<JobHistoryDocument> {
}
export declare class JobHistoryRepo extends BaseRepo<JobHistoryDocument> {
    constructor(connection: Connection, jobModel: Model<JobHistoryDocument>);
}
//# sourceMappingURL=JobHistory.repo.d.ts.map