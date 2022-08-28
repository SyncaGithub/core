import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Client, ClientDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";

export interface IClientRepo extends IBaseRepo<ClientDocument> {}

@Injectable()
export class ClientRepo extends BaseRepo<ClientDocument> {
	constructor(
		@InjectConnection() connection: Connection,
		@InjectModel(Client.name) userModel: Model<ClientDocument>
	) {
		super(connection, userModel);
	}
}
