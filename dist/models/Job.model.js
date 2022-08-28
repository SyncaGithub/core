"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSchema = exports.Job = exports.JobConfiguration = exports.Action = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const jobs_enums_1 = require("../types/jobs.enums");
const User_model_1 = require("./User.model");
class Action {
}
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose_2.default.Schema.Types.ObjectId, ref: "Client" } }),
    __metadata("design:type", Object)
], Action.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: jobs_enums_1.EActionType, required: true }),
    __metadata("design:type", String)
], Action.prototype, "action", void 0);
exports.Action = Action;
class JobConfiguration {
}
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose_2.default.Schema.Types.ObjectId, ref: "Client" } }),
    __metadata("design:type", Object)
], JobConfiguration.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], JobConfiguration.prototype, "isFullFetch", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], JobConfiguration.prototype, "isDisplayOnly", void 0);
exports.JobConfiguration = JobConfiguration;
let Job = class Job {
};
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" } }),
    __metadata("design:type", Object)
], Job.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)([Action]),
    __metadata("design:type", Array)
], Job.prototype, "actionList", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: jobs_enums_1.EJobStatus, default: jobs_enums_1.EJobStatus.STOPPED }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "startHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "startMinute", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "jobHistoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)(JobConfiguration),
    __metadata("design:type", JobConfiguration)
], Job.prototype, "configuration", void 0);
Job = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Job);
exports.Job = Job;
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(User_model_1.User);
//# sourceMappingURL=Job.model.js.map