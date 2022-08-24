import { DynamicModule, Provider } from "@nestjs/common";
export declare class DatabaseModule {
    static register(dbConnectionString: string): DynamicModule;
    static generateDbProviders(dbConnectionString: string): Provider<any>[];
}
//# sourceMappingURL=Database.module.d.ts.map