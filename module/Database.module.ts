import { DynamicModule, Module, Provider } from "@nestjs/common";
import mongoose from "mongoose";
import {
	ClientSchema,
	JobHistorySchema,
	JobSchema,
	ProductSchema,
	UserSchema,
} from "../models";

export interface IDatabaseModuleOptions {
	dbConnectionString: string;
	User?: boolean;
	Client?: boolean;
	Product?: boolean;
	Job?: boolean;
	JobHistory?: boolean;
}

@Module({})
export class DatabaseModule {
	static register(options: IDatabaseModuleOptions): DynamicModule {
		const providers = DatabaseModule.generateDbProviders(options);
		return {
			module: DatabaseModule,
			imports: [],
			providers: [...providers],
			exports: [...providers],
		};
	}

	static generateDbProviders(options: IDatabaseModuleOptions) {
		const dbProviders: Provider<any>[] = [];
		dbProviders.push({
			provide: "DATABASE_CONNECTION",
			useFactory: (): Promise<typeof mongoose> =>
				mongoose.connect(options.dbConnectionString),
		});

		options.User &&
			dbProviders.push({
				provide: "USER_MODEL",
				useFactory: (connection: mongoose.Connection) =>
					connection.model("User", UserSchema),
				inject: ["DATABASE_CONNECTION"],
			});

		options.Client &&
			dbProviders.push({
				provide: "CLIENT_MODEL",
				useFactory: (connection: mongoose.Connection) =>
					connection.model("Client", ClientSchema),
				inject: ["DATABASE_CONNECTION"],
			});

		options.Product &&
			dbProviders.push({
				provide: "PRODUCT_MODEL",
				useFactory: (connection: mongoose.Connection) =>
					connection.model("Product", ProductSchema),
				inject: ["DATABASE_CONNECTION"],
			});

		options.Job &&
			dbProviders.push({
				provide: "JOB_MODEL",
				useFactory: (connection: mongoose.Connection) =>
					connection.model("Job", JobSchema),
				inject: ["DATABASE_CONNECTION"],
			});
		options.JobHistory &&
			dbProviders.push({
				provide: "JOB_HISTORY_MODEL",
				useFactory: (connection: mongoose.Connection) =>
					connection.model("JobHistory", JobHistorySchema),
				inject: ["DATABASE_CONNECTION"],
			});
		return dbProviders;
	}
}
