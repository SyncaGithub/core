import { Connection, Model } from "mongoose";
import { UserDocument } from "../models";
import { BaseRepo, IBaseRepo } from "./Base.repo";
export interface IUserRepo extends IBaseRepo<UserDocument> {
}
export declare class UserRepo extends BaseRepo<UserDocument> {
    constructor(connection: Connection, userModel: Model<UserDocument>);
}
