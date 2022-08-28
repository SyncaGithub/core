// import { Document, Model, Schema, Types } from "mongoose";
// import { EActionStatus, EActionType } from "../types/jobs.enums";

// export interface IJobHistory extends Document {
// 	userId: Types.ObjectId;
// 	dateStart: string;
// 	actionType: EActionType;
// 	dateEnd: string;
// 	status: EActionStatus;
// 	error?: string;
// 	modifiedCount: number;
// 	failedCount: number;
// 	maxModifiedCount: number;
// }

// export interface IJobHistoryModel extends Model<IJobHistory> {}

// export const JobHistorySchema = new Schema<IJobHistory, IJobHistoryModel>(
// 	{
// 		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
// 		dateStart: { type: String, required: true },
// 		actionType: { type: String, enum: EActionType, required: true },
// 		dateEnd: { type: String },
// 		status: { type: String, enum: EActionStatus },
// 		modifiedCount: { type: Number, default: 0 },
// 		failedCount: { type: Number, default: 0 },
// 		maxModifiedCount: { type: Number, default: 0 },
// 		error: String,
// 	},
// 	{ versionKey: false }
// );
