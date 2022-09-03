import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SyncaInject } from "../types/general.enums";

@Module({})
export class QueueModule {
	static register(port: number): DynamicModule {
		return {
			module: QueueModule,
			imports: [
				ClientsModule.register([
					{
						name: SyncaInject.Queue,
						transport: Transport.REDIS,
						options: {
							host: "localhost",
							port: port,
						},
					},
				]),
			],
			providers: [],
			exports: [ClientsModule],
		};
	}
}
