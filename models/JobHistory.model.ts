import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { EActionStatus, EActionType } from "../types/jobs.enums";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";

export type JobHistoryDocument<P extends IPopulated | IRaw = IRaw> =
	JobHistory<P> & Document;

@Schema({ timestamps: true })
export class JobHistory<P extends IPopulated | IRaw = IRaw> {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	user: P extends IRaw ? mongoose.Types.ObjectId : User;

	@Prop({ required: true })
	dateStart: string;

	@Prop({ type: String, enum: EActionType, required: true })
	actionType: string;

	@Prop()
	dateEnd: string;

	@Prop({ type: String, enum: EActionStatus })
	status: string;

	@Prop({ default: 0 })
	modifiedCount: number;

	@Prop({ default: 0 })
	failedCount: number;

	@Prop({ default: 0 })
	maxModifiedCount: number;

	@Prop()
	error: String;
}

export const JobHistorySchema = SchemaFactory.createForClass(JobHistory);
