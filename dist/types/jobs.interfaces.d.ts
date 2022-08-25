import { Types } from "mongoose";
import { IJob, IJobHistory } from "../models";
import { EActionType } from "./jobs.enums";
export interface IJobFinish {
    job: IJob;
    finishedJob: EActionType;
    jobHistoryData?: Partial<IJobHistory>;
}
export interface IUpdateJobHistory {
    jobHistoryId: Types.ObjectId | string;
    dataToUpdate: Partial<IJobHistory>;
}
//# sourceMappingURL=jobs.interfaces.d.ts.map