import { DynamicModule, Provider } from "@nestjs/common";
export interface IDatabaseModuleOptions {
    dbConnectionString: string;
    User?: boolean;
    Client?: boolean;
    Product?: boolean;
    Job?: boolean;
    JobHistory?: boolean;
}
export declare enum DatabaseProviders {
    User = "USER_MODEL",
    Client = "CLIENT_MODEL",
    Product = "PRODUCT_MODEL",
    Job = "JOB_MODEL",
    JobHistory = "JOB_HISTORY_MODEL"
}
export declare class DatabaseModule {
    static register(options: IDatabaseModuleOptions): DynamicModule;
    static generateDbProviders(options: IDatabaseModuleOptions): Provider<any>[];
}
//# sourceMappingURL=Database.module.d.ts.map