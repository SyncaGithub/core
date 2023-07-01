"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseMicroServiceClientOptions = exports.WarehouseMicroServiceOptions = exports.SellerMicroServiceClientOptions = exports.SellerMicroServiceOptions = exports.JobsMicroServiceClientOptions = exports.JobsMicroServiceOptions = exports.ImagesMicroServiceClientOptions = exports.ImagesMicroServiceOptions = exports.AuthMicroServiceClientOptions = exports.AuthMicroServiceOptions = exports.RedisServiceOptions = void 0;
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
exports.ImagesMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
};
exports.ImagesMicroServiceClientOptions = {
    name: 'IMAGES_CLIENT',
    transport: exports.ImagesMicroServiceOptions.transport,
    options: exports.ImagesMicroServiceOptions.options
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
exports.SellerMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
};
exports.SellerMicroServiceClientOptions = {
    name: 'CASHCOW_CLIENT',
    transport: exports.SellerMicroServiceOptions.transport,
    options: exports.SellerMicroServiceOptions.options,
};
exports.WarehouseMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
};
exports.WarehouseMicroServiceClientOptions = {
    name: 'WAREHOUSE_CLIENT',
    transport: exports.WarehouseMicroServiceOptions.transport,
    options: exports.WarehouseMicroServiceOptions.options,
};
//# sourceMappingURL=constants.js.map