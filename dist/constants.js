"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const RedisServiceOptions = {
    transport: microservices_1.Transport.REDIS,
    options: {
        host: 'localhost',
        port: 6379,
    },
};
const AuthMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50053 },
};
const ImagesMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
};
const JobsMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
};
const SellerMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
};
const WarehouseMicroServiceOptions = {
    transport: microservices_1.Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
};
//# sourceMappingURL=constants.js.map