import { IUser } from "../models/User.model";
import { EActionStatus, EActionType } from "./auth.enums";
export interface IAuthService {
    findById(id: string): Promise<IUser>;
    login(loginOrRegister: ILoginOrRegister): Promise<ILoginOrRegisterResponse>;
    register(loginOrRegister: ILoginOrRegister): Promise<ILoginOrRegisterResponse>;
    changePassword(changePassword: IChangePassword): Promise<IChangePasswordRespone>;
}
export interface ILoginOrRegister {
    email: string;
    password: string;
}
export interface ILoginOrRegisterResponse {
    _id: string;
    email: string;
    isActivated: boolean;
}
export interface IChangePassword {
    userId: string;
    oldPassword: string;
    newPassword: string;
}
export interface IChangePasswordRespone {
    message: string;
}
export interface IAction {
    dateStart: string;
    dateEnd: string;
    actionType: EActionType;
    status: EActionStatus;
    modifiedCount: number;
    maxModifiedCount?: number;
}
//# sourceMappingURL=auth.interfaces.d.ts.map