import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Job, JobDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface IJobRepo extends IBaseRepo<JobDocument> {}

@Injectable()
export class JobRepo extends BaseRepo<JobDocument> {
	constructor(
		@InjectConnection() connection: Connection,
		@InjectModel(Job.name) jobModel: Model<JobDocument>
	) {
		super(connection, jobModel);
	}
}
