import { Types } from "mongoose";
import { JobDocument, JobHistoryDocument } from "../models";
import { EActionType } from "./jobs.enums";

export interface IJobFinish {
	job: JobDocument;
	finishedJob: EActionType;
	jobHistoryData?: Partial<JobHistoryDocument>;
}

export interface IUpdateJobHistory {
	jobHistoryId: Types.ObjectId | string;
	dataToUpdate: Partial<JobHistoryDocument>;
}
