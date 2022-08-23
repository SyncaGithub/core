import { Document, Model, Schema } from "mongoose";
export interface IUser extends Document {
    email: string;
    password: string;
    isActivated: boolean;
    comparePasswords(password: string): Promise<boolean>;
}
export interface IUserModel extends Model<IUser> {
    comparePasswords(password: string): Promise<boolean>;
}
export declare const UserSchema: Schema<IUser, IUserModel, {}, {}, {}, {}, "type", IUser>;
//# sourceMappingURL=User.model.d.ts.map