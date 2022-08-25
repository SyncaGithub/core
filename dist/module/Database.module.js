"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = exports.DatabaseProviders = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../models");
var DatabaseProviders;
(function (DatabaseProviders) {
    DatabaseProviders["User"] = "USER_MODEL";
    DatabaseProviders["Client"] = "CLIENT_MODEL";
    DatabaseProviders["Product"] = "PRODUCT_MODEL";
    DatabaseProviders["Job"] = "JOB_MODEL";
    DatabaseProviders["JobHistory"] = "JOB_HISTORY_MODEL";
})(DatabaseProviders = exports.DatabaseProviders || (exports.DatabaseProviders = {}));
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static register(options) {
        const providers = DatabaseModule_1.generateDbProviders(options);
        return {
            module: DatabaseModule_1,
            imports: [mongoose_1.MongooseModule.forRoot(options.dbConnectionString)],
            providers: [...providers],
            exports: [...providers],
        };
    }
    static generateDbProviders(options) {
        const dbProviders = [];
        // dbProviders.push({
        // 	provide: "DATABASE_CONNECTION",
        // 	useFactory: (): Promise<typeof mongoose> =>
        // 		mongoose.connect(options.dbConnectionString),
        // });
        options.User &&
            dbProviders.push({
                provide: "USER_MODEL",
                useFactory: (connection) => connection.model("User", models_1.UserSchema),
                inject: ["DATABASE_CONNECTION"],
            });
        options.Client &&
            dbProviders.push({
                provide: "CLIENT_MODEL",
                useFactory: (connection) => connection.model("Client", models_1.ClientSchema),
                inject: ["DATABASE_CONNECTION"],
            });
        options.Product &&
            dbProviders.push({
                provide: "PRODUCT_MODEL",
                useFactory: (connection) => connection.model("Product", models_1.ProductSchema),
                inject: ["DATABASE_CONNECTION"],
            });
        options.Job &&
            dbProviders.push({
                provide: "JOB_MODEL",
                useFactory: (connection) => connection.model("Job", models_1.JobSchema),
                inject: ["DATABASE_CONNECTION"],
            });
        options.JobHistory &&
            dbProviders.push({
                provide: "JOB_HISTORY_MODEL",
                useFactory: (connection) => connection.model("JobHistory", models_1.JobHistorySchema),
                inject: ["DATABASE_CONNECTION"],
            });
        return dbProviders;
    }
};
DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({})
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=Database.module.js.map