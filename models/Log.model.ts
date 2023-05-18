import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { IPopulated, IRaw } from "./types";
import { User } from "./User.model";
import { JobHistory } from "./JobHistory.model";

export type LogDocument<P extends IPopulated | IRaw = IRaw> = Log<P> & Document;

@Schema({ timestamps: true })
export class Log<P extends IPopulated | IRaw = IRaw> {
	// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	// user: P extends IRaw ? mongoose.Types.ObjectId : User;
	//
	// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "JobHistory", required: true })
	// jobHistoryId: P extends IRaw ? mongoose.Types.ObjectId : JobHistory;

	@Prop()
	status?: string;

	@Prop({type: mongoose.Schema.Types.Mixed})
	requestHeaders?: any;

	@Prop({type: mongoose.Schema.Types.Mixed})
	requestPayload?: any;

	@Prop({type: mongoose.Schema.Types.Mixed})
	responsePayload?: any;

	@Prop({type: mongoose.Schema.Types.Mixed})
	responseStatusCode?: any;

	@Prop(String)
	url: string;

	@Prop(String)
	method: string;

	@Prop(Number)
	startTime: number

	@Prop(Number)
	endTime: number

	@Prop(Boolean)
	success: boolean;
}

export const LogSchema = SchemaFactory.createForClass(Log);
