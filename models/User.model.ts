import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	email: string;
	@Prop()
	password: string;
	@Prop()
	isActivated: boolean;

	comparePasswords: Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>("save", async function (next) {
	const user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified("password")) return next();

	try {
		// generate a salt
		const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT));
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
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
