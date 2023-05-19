import { Connection, Model } from "mongoose";
import { ClientDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IClientRepo extends IBaseRepo<ClientDocument> {
}
export declare class ClientRepo extends BaseRepo<ClientDocument> {
    constructor(connection: Connection, userModel: Model<ClientDocument>);
}
