import { DynamicModule, Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import {
	ClientSchema,
	JobHistorySchema,
	JobSchema,
	ProductSchema,
	UserSchema,
} from "../models";
import { User } from "../models/User.model";

export interface IDatabaseModuleOptions {
	dbConnectionString: string;
	User?: boolean;
	Client?: boolean;
	Product?: boolean;
	Job?: boolean;
	JobHistory?: boolean;
}

export enum DatabaseProviders {
	User = "USER_MODEL",
	Client = "CLIENT_MODEL",
	Product = "PRODUCT_MODEL",
	Job = "JOB_MODEL",
	JobHistory = "JOB_HISTORY_MODEL",
}

@Module({})
export class DatabaseModule {
	static register(options: IDatabaseModuleOptions): DynamicModule {
		const providers = DatabaseModule.generateDbProviders(options);
		return {
			module: DatabaseModule,
			imports: [
				MongooseModule.forRoot(options.dbConnectionString),
				MongooseModule.forFeature([
					{ name: User.name, schema: UserSchema },
				]),
			],
			providers: [...providers],
			exports: [...providers],
		};
	}

	static generateDbProviders(options: IDatabaseModuleOptions) {
		const dbProviders: Provider<any>[] = [];
		// dbProviders.push({
		// 	provide: "DATABASE_CONNECTION",
		// 	useFactory: (): Promise<typeof mongoose> =>
		// 		mongoose.connect(options.dbConnectionString),
		// });

		options.User &&
			dbProviders.push({
				provide: DatabaseProviders.User,
				useFactory: (connection: mongoose.Connection) =>
					connection.model("User", UserSchema),
				inject: ["DATABASE_CONNECTION"],
			});

		options.Client &&
			dbProviders.push({
				provide: DatabaseProviders.Client,
				useFactory: (connection: mongoose.Connection) =>
					connection.model("Client", ClientSchema),
				inject: ["DATABASE_CONNECTION"],
			});

		options.Product &&
			dbProviders.push({
				provide: DatabaseProviders.Product,
				useFactory: (connection: mongoose.Connection) =>
					connection.model("Product", ProductSchema),
				inject: ["DATABASE_CONNECTION"],
			});

		options.Job &&
			dbProviders.push({
				provide: DatabaseProviders.Job,
				useFactory: (connection: mongoose.Connection) =>
					connection.model("Job", JobSchema),
				inject: ["DATABASE_CONNECTION"],
			});
		options.JobHistory &&
			dbProviders.push({
				provide: DatabaseProviders.JobHistory,
				useFactory: (connection: mongoose.Connection) =>
					connection.model("JobHistory", JobHistorySchema),
				inject: ["DATABASE_CONNECTION"],
			});
		return dbProviders;
	}
}
