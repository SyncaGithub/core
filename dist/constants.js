"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseMicroServiceOptions = exports.SellerMicroServiceOptions = exports.JobsMicroServiceOptions = exports.ImagesMicroServiceOptions = exports.AuthMicroServiceOptions = exports.RedisServiceOptions = void 0;
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
exports.ImagesMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
};
exports.JobsMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
};
exports.SellerMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
};
exports.WarehouseMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
};
//# sourceMappingURL=constants.js.map