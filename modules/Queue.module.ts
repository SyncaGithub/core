import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({})
export class QueueModule {
	static register(port: number): DynamicModule {
		return {
			module: QueueModule,
			imports: [
				ClientsModule.register([
					{
						name: "QUEUE_SERVICE",
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
