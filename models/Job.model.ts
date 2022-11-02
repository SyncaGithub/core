import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { ECashcowOrderStatus, IOrder } from "../types";
import { EActionType, EJobStatus } from "../types/jobs.enums";
import { Client } from "./Client.model";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";

export type JobDocument<P extends IPopulated | IRaw = IRaw> = Job<P> & Document;

export class Action<P extends IPopulated | IRaw = IRaw> {
	client: ObjectId;

	@Prop({ enum: EActionType, required: true })
	action: string;
}
export class JobConfiguration<P extends IPopulated | IRaw = IRaw> {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Client" })
	client?: P extends IRaw ? ObjectId : Client;

	@Prop()
	isFullFetch?: boolean;

	@Prop()
	isDisplayOnly?: boolean;

	startNow?: boolean;
	sellerClientId?: mongoose.Types.ObjectId;
	orders?: IOrder[];
	cashcowOrderStatus?: ECashcowOrderStatus;
}

@Schema({ timestamps: true })
export class Job<P extends IPopulated | IRaw = IRaw> {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	user: P extends IRaw ? mongoose.Types.ObjectId : User;

	@Prop({ type: [Action], required: true, default: [] })
	actionList: Action[];

	@Prop({ enum: EJobStatus, default: EJobStatus.STOPPED })
	status?: string;

	@Prop({ required: true, type: String })
	startHour: string;

	@Prop({ required: true, type: String })
	startMinute: string;

	@Prop()
	jobHistoryId?: string;

	@Prop(JobConfiguration)
	configuration?: JobConfiguration;

	currentActionHistoryId?: string;
	currentActinIndex: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
