"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceMicroServiceClientOptions = exports.CommerceMicroServiceOptions = exports.JobsMicroServiceClientOptions = exports.JobsMicroServiceOptions = exports.AuthMicroServiceClientOptions = exports.AuthMicroServiceOptions = exports.RedisServiceOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.RedisServiceOptions = {
    transport: microservices_1.Transport.REDIS,
    options: {
        host: 'localhost',
        port: 6379,
    },
};
exports.AuthMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50053 },
};
exports.AuthMicroServiceClientOptions = {
    name: 'AUTH_CLIENT',
    transport: exports.AuthMicroServiceOptions.transport,
    options: exports.AuthMicroServiceOptions.options
};
exports.JobsMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
};
exports.JobsMicroServiceClientOptions = {
    name: 'JOBS_CLIENT',
    transport: exports.JobsMicroServiceOptions.transport,
    options: exports.JobsMicroServiceOptions.options,
};
exports.CommerceMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
};
exports.CommerceMicroServiceClientOptions = {
    name: 'COMMERCE_CLIENT',
    transport: exports.CommerceMicroServiceOptions.transport,
    options: exports.CommerceMicroServiceOptions.options,
};
//# sourceMappingURL=constants.js.map