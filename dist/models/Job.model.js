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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSchema = exports.Job = exports.JobConfiguration = exports.JobActionSchema = exports.Action = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jobs_enums_1 = require("../types/jobs.enums");
let Action = class Action {
};
exports.Action = Action;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Client" }),
    __metadata("design:type", Object)
], Action.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: jobs_enums_1.EActionType, required: true }),
    __metadata("design:type", String)
], Action.prototype, "action", void 0);
exports.Action = Action = __decorate([
    (0, mongoose_1.Schema)({ timestamps: false, _id: false, versionKey: false })
], Action);
exports.JobActionSchema = mongoose_1.SchemaFactory.createForClass(Action);
class JobConfiguration {
}
exports.JobConfiguration = JobConfiguration;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Client" }),
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
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", Object)
], Job.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.JobActionSchema], required: true, default: [] }),
    __metadata("design:type", Array)
], Job.prototype, "actionList", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: jobs_enums_1.EJobStatus, default: jobs_enums_1.EJobStatus.STOPPED }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Job.prototype, "startHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
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
exports.Job = Job = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Job);
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
//# sourceMappingURL=Job.model.js.map