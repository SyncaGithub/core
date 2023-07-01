import {Job, JobDocument, JobHistory, JobHistoryDocument} from "../models";
import {EActionStatus, EActionType} from "./jobs.enums";

export interface IUpdateJobHistory {
    jobHistoryId: string;
    dataToUpdate: Partial<JobHistoryDocument>;
}

export interface IDeleteJob {
    jobId: string;
    userId: string;
}

export interface IUdateJob {
    jobId: string;
    userId: string;
    dataToUpdate: Partial<Job>;
}

export interface IJobFinish {
    job: JobDocument;
    finishedJob: EActionType;
    actionStatus?: EActionStatus;
    jobHistoryData: Partial<JobHistory>;
}

export interface IImageCompress {
    imageName: string;
    imageUrl: string;
}