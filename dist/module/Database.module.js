"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static register(options) {
        const providers = DatabaseModule_1.generateDbProviders(options);
        return {
            module: DatabaseModule_1,
            imports: [],
            providers: [...providers],
            exports: [...providers],
        };
    }
    static generateDbProviders(options) {
        const dbProviders = [];
        dbProviders.push({
            provide: "DATABASE_CONNECTION",
            useFactory: () => mongoose_1.default.connect(options.dbConnectionString),
        });
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