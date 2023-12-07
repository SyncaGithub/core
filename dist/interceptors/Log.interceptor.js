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
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const repositories_1 = require("../repositories");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor(logRepo) {
        this.logRepo = logRepo;
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const startTime = Date.now();
        const requestPayload = request.data;
        const requestHeaders = request.headers;
        const currentUserId = (_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a._id;
        return next.handle().pipe((0, operators_1.tap)((response) => {
            const endTime = Date.now();
            const responsePayload = response.data;
            const responseStatusCode = response.status;
            const logData = {
                user: currentUserId,
                url: request.url,
                method: request.method,
                startTime,
                endTime,
                requestPayload,
                requestHeaders,
                responsePayload,
                responseStatusCode,
                success: true,
            };
            this.logger.log(`Request successful: ${request.url}`);
            this.logger.log(`Response: ${JSON.stringify(response.data)}`);
            this.logRepo.add(logData);
        }), (0, operators_1.catchError)((error) => {
            var _a, _b, _c;
            const endTime = Date.now();
            const responsePayload = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            const responseStatusCode = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status;
            const logData = {
                user: currentUserId,
                url: request.url,
                method: request.method,
                startTime,
                endTime,
                requestPayload,
                requestHeaders,
                responsePayload,
                responseStatusCode,
                success: false,
            };
            this.logger.error(`Request failed: ${request.url}`);
            this.logger.error(`Error: ${JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)}`);
            this.logRepo.add(logData);
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.LogRepo])
], LoggingInterceptor);
//# sourceMappingURL=Log.interceptor.js.map