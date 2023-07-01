import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogRepo } from "../repositories";
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logRepo;
    private readonly logger;
    constructor(logRepo: LogRepo);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
