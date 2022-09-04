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
exports.JobHistorySchema = exports.JobHistory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const jobs_enums_1 = require("../types/jobs.enums");
let JobHistory = class JobHistory {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", Object)
], JobHistory.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobHistory.prototype, "dateStart", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: jobs_enums_1.EActionType, required: true }),
    __metadata("design:type", String)
], JobHistory.prototype, "actionType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobHistory.prototype, "dateEnd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: jobs_enums_1.EActionStatus }),
    __metadata("design:type", String)
], JobHistory.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], JobHistory.prototype, "modifiedCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], JobHistory.prototype, "failedCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], JobHistory.prototype, "maxModifiedCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobHistory.prototype, "error", void 0);
JobHistory = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], JobHistory);
exports.JobHistory = JobHistory;
exports.JobHistorySchema = mongoose_1.SchemaFactory.createForClass(JobHistory);
//# sourceMappingURL=JobHistory.model.js.map