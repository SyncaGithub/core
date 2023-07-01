import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import {Log, LogDocument} from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface ILogRepo extends IBaseRepo<LogDocument> {}

@Injectable()
export class LogRepo extends BaseRepo<LogDocument> {
    constructor(
        @InjectConnection() connection: Connection,
        @InjectModel(Log.name) jobModel: Model<LogDocument>
    ) {
        super(connection, jobModel);
    }
}
