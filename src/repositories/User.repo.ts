import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { User, UserDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface IUserRepo extends IBaseRepo<UserDocument> {}

@Injectable()
export class UserRepo extends BaseRepo<UserDocument> {
	constructor(
		@InjectConnection() connection: Connection,
		@InjectModel(User.name) userModel: Model<UserDocument>
	) {
		super(connection, userModel);
	}
}
