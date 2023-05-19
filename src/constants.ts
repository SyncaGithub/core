import {MicroserviceOptions, RedisOptions, Transport} from "@nestjs/microservices";

export const RedisServiceOptions: RedisOptions = {
    transport: Transport.REDIS,
    options: {
        host: 'localhost',
        port: 6379,
    },
}

export const AuthMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {host: '127.0.0.1', port: 50053},
}
export const ImagesMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
}
export const JobsMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
}
export const SellerMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
}
export const WarehouseMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
}