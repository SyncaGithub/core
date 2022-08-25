"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const bcrypt = __importStar(require("bcrypt"));
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
exports.UserSchema.pre("save", async function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password"))
        return next();
    try {
        // generate a salt
        const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT));
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
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