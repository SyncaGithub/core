import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({})
export class QeueModule {
	static register(port: number): DynamicModule {
		return {
			module: QeueModule,
			imports: [
				ClientsModule.register([
					{
						name: "QEUE_SERVICE",
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
