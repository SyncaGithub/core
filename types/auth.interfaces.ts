import { IUser } from "../models/User.model";
import { EActionStatus, EActionType } from "./jobs.enums";

export interface IAuthService {
	findById(id: string): Promise<IUser>;
	login(loginOrRegister: ILoginOrRegister): Promise<ILoginOrRegisterResponse>;
	register(
		loginOrRegister: ILoginOrRegister
	): Promise<ILoginOrRegisterResponse>;
	changePassword(
		changePassword: IChangePassword
	): Promise<IChangePasswordResponse>;
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

export interface IChangePasswordResponse {
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
