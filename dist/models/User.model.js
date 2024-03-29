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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const types_1 = require("../types");
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)(String),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)(String),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number], enum: types_1.Roles, default: [types_1.Roles.USER] }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT));
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.UserSchema.methods.comparePasswords = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return Promise.resolve(isMatch);
    }
    catch (error) {
        return Promise.resolve(error);
    }
};
//# sourceMappingURL=User.model.js.map