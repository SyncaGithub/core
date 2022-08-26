// import * as bcrypt from "bcrypt";
// import { Document, Model, Schema } from "mongoose";

// export interface IUser extends Document {
// 	email: string;
// 	password: string;
// 	isActivated: boolean;
// 	comparePasswords(password: string): Promise<boolean>;
// }

// export interface IUserModel extends Model<IUser> {
// 	comparePasswords(password: string): Promise<boolean>;
// }

// export const UserSchema = new Schema<IUser, IUserModel>(
// 	{
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 			validate:
// 				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// 		},
// 		password: { type: String, required: true },
// 		isActivated: { type: Boolean, default: false },
// 	},
// 	{ timestamps: true, versionKey: false }
// );

// UserSchema.pre<IUser>("save", async function (next) {
// 	const user = this;
// 	// only hash the password if it has been modified (or is new)
// 	if (!user.isModified("password")) return next();

// 	try {
// 		// generate a salt
// 		const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT));
// 		const hash = await bcrypt.hash(user.password, salt);
// 		user.password = hash;
// 		next();
// 	} catch (error: any) {
// 		next(error);
// 	}
// });

// UserSchema.methods.comparePasswords = async function (
// 	candidatePassword
// ): Promise<boolean> {
// 	try {
// 		const isMatch = await bcrypt.compare(candidatePassword, this.password);
// 		return Promise.resolve(isMatch);
// 	} catch (error: any) {
// 		return Promise.resolve(error);
// 	}
// };
