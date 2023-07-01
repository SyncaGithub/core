import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { JobHistory, JobHistoryDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface IJobHistoryRepo extends IBaseRepo<JobHistoryDocument> {}

@Injectable()
export class JobHistoryRepo extends BaseRepo<JobHistoryDocument> {
	constructor(
		@InjectConnection() connection: Connection,
		@InjectModel(JobHistory.name) jobModel: Model<JobHistoryDocument>
	) {
		super(connection, jobModel);
	}
}
