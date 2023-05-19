import {Transport} from "@nestjs/microservices";

const RedisServiceOptions = {
    transport: Transport.REDIS,
    options: {
        host: 'localhost',
        port: 6379,
    },
}

const AuthMicroServiceOptions = {
    transport: Transport.TCP,
    options: {host: '127.0.0.1', port: 50053},
}
const ImagesMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
}
const JobsMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
}
const SellerMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
}
const WarehouseMicroServiceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
}