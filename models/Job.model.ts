import { Document, Model, Schema, Types } from "mongoose";
import { ECashcowOrderStatus, IOrder } from "../types";
import { EActionType, EJobStatus } from "../types/jobs.enums";

export interface IJob extends Document {
	_id: string;
	actions: EActionType[]; // delete after actionList got completly in use
	actionList: { action: EActionType; clientId: Types.ObjectId }[];
	startHour: string;
	startMinute: string;
	status: EJobStatus;
	userId: Types.ObjectId;
	configuration: {
		clientId: Types.ObjectId;
		isFullFetch: boolean;
		isDisplayOnly: boolean;
		startNow: boolean;
		sellerClientId: Types.ObjectId;
		orders?: IOrder[];
		cashcowOrderStatus: ECashcowOrderStatus;
	};
	jobHistoryId?: string;
	currentActionHistoryId?: string;
	currentActinIndex: number;
}

export interface IJobModel extends Model<IJob> {}

export const JobSchema = new Schema<IJob, IJobModel>(
	{
		actions: { type: [String], enum: EActionType, required: true },
		actionList: [
			{
				clientId: { type: Schema.Types.ObjectId, ref: "Client" },
				action: { type: String, enum: EActionType, required: true },
			},
		],
		status: { type: String, enum: EJobStatus, default: EJobStatus.STOPED },
		startHour: { type: String, required: true },
		startMinute: { type: String, required: true },
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		configuration: {
			clientId: { type: Schema.Types.ObjectId, ref: "Client" },
			isFullFetch: Boolean,
			isDisplayOnly: Boolean,
		},
		jobHistoryId: String,
	},
	{ timestamps: true, versionKey: false }
);
