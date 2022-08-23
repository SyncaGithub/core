import { Types, Document, Model } from "mongoose";
import { IJob } from "../models/Job.model";
import {
	EActionStatus,
	EActionType,
	ECashcowOrderStatus,
	EClientType,
	EJobStatus,
	EntityStatus,
	EQtyType,
} from "./tempEnums";

export interface BaseEntity {
	userId: String;
	status: EntityStatus;
	nickname: string;
}

export interface IOrder {
	Id: number;
	TotalPrice: number;
	Products: { sku: string; Qty: number }[];
	IsSelfDelivery: boolean;
	Email: string;
	Phone: string;
	City: string;
	Address: string;
	StreetNameAndNumber: string;
	ApartmentNumber: string;
	FloorNumber: string;
	FirstName: string;
	LastName: string;
	LastDigits: string;
	OrderDate: string;
	//#TODO: create generic order interface
	//       that can implement priority order for now
}

export interface IJobHistory extends Document {
	userId: Types.ObjectId;
	dateStart: string;
	actionType: EActionType;
	dateEnd: string;
	status: EActionStatus;
	error?: string;
	modifiedCount: number;
	failedCount: number;
	maxModifiedCount: number;
}

export interface IJobFinish {
	job: IJob;
	finishedJob: EActionType;
	jobHistoryData?: Partial<IJobHistory>;
}

export interface IUpdateJobHistory {
	jobHistoryId: Types.ObjectId | string;
	dataToUpdate: Partial<IJobHistory>;
}

export interface IClientFilters {
	userId: string;
	_id: string;
}

export interface ILoadExcel<Product = any> {
	products: Product[];
	userId: string;
}
