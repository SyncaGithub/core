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
var ApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const Log_repo_1 = require("../repositories/Log.repo");
let ApiService = ApiService_1 = class ApiService {
    constructor(httpService, logRepo) {
        this.httpService = httpService;
        this.logRepo = logRepo;
        this.logger = new common_1.Logger(ApiService_1.name);
    }
    // Todo: Maybe in the future return Observable<T> instead of Observable<AxiosResponse<T>>
    wrap(url, data, config, method, requestFn) {
        const startTime = Date.now();
        const requestPayload = data;
        const requestHeaders = config;
        return requestFn().pipe((0, rxjs_1.tap)((response) => {
            const endTime = Date.now();
            const responsePayload = response.data;
            const responseStatusCode = response.status;
            const logData = {
                url: url,
                method: method,
                startTime,
                endTime,
                requestPayload,
                requestHeaders,
                // responsePayload,
                responseStatusCode,
                success: true,
            };
            this.logger.log(`Request successful: ${url}`);
            this.logger.log(`Response: ${JSON.stringify(response.data)}`);
            this.logRepo.add(logData) // Save the log data to the database
                .then(data => console.log({ data }), err => console.log({ err }));
        }), (0, rxjs_1.catchError)((error) => {
            var _a, _b, _c;
            const endTime = Date.now();
            const responsePayload = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            const responseStatusCode = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status;
            const logData = {
                url: url,
                method: method,
                startTime,
                endTime,
                requestPayload,
                requestHeaders,
                responsePayload,
                responseStatusCode,
                success: false,
            };
            this.logger.error(`Request failed: ${url}`);
            this.logger.error(`Error: ${JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.data)}`);
            this.logRepo.add(logData) // Save the log data to the database
                .then(data => console.log({ data }), err => console.log({ err }));
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
    get(url, config) {
        return this.wrap(url, undefined, config, 'get', () => this.httpService.get(url, config));
    }
    post(url, data, config) {
        return this.wrap(url, data, config, 'post', () => this.httpService.post(url, data, config));
    }
    put(url, data, config) {
        return this.wrap(url, data, config, 'put', () => this.httpService.put(url, data, config));
    }
    patch(url, data, config) {
        return this.wrap(url, data, config, 'patch', () => this.httpService.patch(url, data, config));
    }
    delete(url, config) {
        return this.wrap(url, undefined, config, 'delete', () => this.httpService.delete(url, config));
    }
};
ApiService = ApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        Log_repo_1.LogRepo])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map