import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as bcrypt from "bcrypt";
import {Roles} from "../enums";

export type UserDocument = User & Document & UserMethods;

export interface UserMethods {
	comparePasswords(password: string): Promise<boolean>;
}

@Schema({ timestamps: true })
export class User {

	@Prop(String)
	firstName: string;

	@Prop(String)
	lastName: string;

	@Prop({required: true, unique: true, type: String})
	email: string;

	@Prop({required: true, type: String})
	password: string;

	@Prop({ default: false })
	isActivated: boolean;

	@Prop({type: [String], default: [], enum: Roles})
	roles: Roles[];

	@Prop({type: String })
	passwordResetToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>("save", async function (next) {
	const user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified("password")) return next();

	try {
		// generate a salt
		const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT));
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (error: any) {
		next(error);
	}
});

UserSchema.methods.comparePasswords = async function (
	candidatePassword
): Promise<boolean> {
	try {
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		return Promise.resolve(isMatch);
	} catch (error: any) {
		return Promise.resolve(error);
	}
};
