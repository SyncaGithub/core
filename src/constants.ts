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

export const JobsMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50054 }
}
export const JobsMicroServiceClientOptions: ClientProviderOptions = {
    name: 'JOBS_CLIENT',
    transport: JobsMicroServiceOptions.transport,
    options: JobsMicroServiceOptions.options,
}

export const CommerceMicroServiceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 50051 }
}
export const CommerceMicroServiceClientOptions: ClientProviderOptions = {
    name: 'COMMERCE_CLIENT',
    transport: CommerceMicroServiceOptions.transport,
    options: CommerceMicroServiceOptions.options,
}