import { Injectable, Logger, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { tap, catchError } from 'rxjs/operators';
import {LogRepo} from "../repositories";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    constructor(private readonly logRepo: LogRepo) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<AxiosRequestConfig>();

        const startTime = Date.now();
        const requestPayload = request.data;
        const requestHeaders = request.headers;

        return next.handle().pipe(
            tap((response: AxiosResponse) => {
                const endTime = Date.now();
                const responsePayload = response.data;
                const responseStatusCode = response.status;

                const logData = {
                    url: request.url,
                    method: request.method,
                    startTime,
                    endTime,
                    requestPayload,
                    requestHeaders,
                    responsePayload,
                    responseStatusCode,
                    success: true,
                };

                this.logger.log(`Request successful: ${request.url}`);
                this.logger.log(`Response: ${JSON.stringify(response.data)}`);

                this.logRepo.add(logData); // Save the log data to the database
            }),
            catchError((error: AxiosError) => {
                const endTime = Date.now();
                const responsePayload = error.response?.data;
                const responseStatusCode = error.response?.status;

                const logData = {
                    url: request.url,
                    method: request.method,
                    startTime,
                    endTime,
                    requestPayload,
                    requestHeaders,
                    responsePayload,
                    responseStatusCode,
                    success: false,
                };

                this.logger.error(`Request failed: ${request.url}`);
                this.logger.error(`Error: ${JSON.stringify(error.response?.data)}`);

                this.logRepo.add(logData); // Save the log data to the database

                return throwError(() =>error);
            }),
        );
    }
}
