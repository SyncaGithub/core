import {Transport} from "@nestjs/microservices";

export const RedisServiceOptions = {
    transport: Transport.REDIS,
    options: {
        host: 'localhost',
        port: 6379,
    },
}

export const AuthMicroServiceOptions = {
    transport: Transport.TCP,
    options: {host: '127.0.0.1', port: 50053},
}
export const ImagesMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
}
export const JobsMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
}
export const SellerMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
}
export const WarehouseMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
}