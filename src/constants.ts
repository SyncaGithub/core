import {
    ClientProviderOptions,
    MicroserviceOptions,
    RedisOptions,
    Transport
} from "@nestjs/microservices";

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
export const AuthMicroServiceClientOptions: ClientProviderOptions = {
    name: 'AUTH_CLIENT',
    transport: AuthMicroServiceOptions.transport,
    options: AuthMicroServiceOptions.options
}
export const ImagesMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50059 },
}
export const ImagesMicroServiceClientOptions: ClientProviderOptions = {
    name: 'IMAGES_CLIENT',
    transport: ImagesMicroServiceOptions.transport,
    options: ImagesMicroServiceOptions.options
}
export const JobsMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
}
export const JobsMicroServiceClientOptions: ClientProviderOptions = {
    name: 'JOBS_CLIENT',
    transport: JobsMicroServiceOptions.transport,
    options: JobsMicroServiceOptions.options,
}
export const SellerMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50052 }
}
export const SellerMicroServiceClientOptions: ClientProviderOptions = {
    name: 'CASHCOW_CLIENT',
    transport: SellerMicroServiceOptions.transport,
    options: SellerMicroServiceOptions.options,
}
export const WarehouseMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
}
export const WarehouseMicroServiceClientOptions: ClientProviderOptions = {
    name: 'WAREHOUSE_CLIENT',
    transport: WarehouseMicroServiceOptions.transport,
    options: WarehouseMicroServiceOptions.options,
}