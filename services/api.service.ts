import {Injectable, Logger} from "@nestjs/common";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {LogRepo} from "@repositories/Log.repo";

@Injectable()
export class ApiService {
    private readonly logger = new Logger(ApiService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly logRepo: LogRepo
    ) {}

    // Todo: Maybe in the future return Observable<T> instead of Observable<AxiosResponse<T>>
    wrap<T>(url: string, data: any, config: AxiosRequestConfig, requestFn: (...arg:any) => Observable<AxiosResponse<T>>): Observable<AxiosResponse<T>> {
        const startTime = Date.now();
        const requestPayload = data;
        const requestHeaders = config;
        return (requestFn.name === 'get' ? requestFn(url, config) : requestFn(url, data, config)).pipe(
            tap((response: AxiosResponse) => {
                const endTime = Date.now();
                const responsePayload = response.data;
                const responseStatusCode = response.status;

                const logData = {
                    url: url,
                    method: requestFn.name,
                    startTime,
                    endTime,
                    requestPayload,
                    requestHeaders,
                    responsePayload,
                    responseStatusCode,
                    success: true,
                };

                this.logger.log(`Request successful: ${url}`);
                this.logger.log(`Response: ${JSON.stringify(response.data)}`);

                this.logRepo.add(logData); // Save the log data to the database
            }),
            catchError((error: AxiosError) => {
                const endTime = Date.now();
                const responsePayload = error.response?.data;
                const responseStatusCode = error.response?.status;

                const logData = {
                    url: url,
                    method: requestFn.name,
                    startTime,
                    endTime,
                    requestPayload,
                    requestHeaders,
                    responsePayload,
                    responseStatusCode,
                    success: false,
                };

                this.logger.error(`Request failed: ${url}`);
                this.logger.error(`Error: ${JSON.stringify(error.response?.data)}`);

                this.logRepo.add(logData); // Save the log data to the database

                return throwError(() =>error);
            }),
            // map((response: AxiosResponse<T>) => response.data),
        );
    }

    get<T>(url: string, config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.wrap<T>(url, undefined, config, this.httpService.get<T>);
    }

    post<T>(url: string, data: any, config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.wrap<T>(url, data, config, this.httpService.post<T>);
    }

    put<T>(url: string, data: any, config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.wrap<T>(url, data, config, this.httpService.put<T>);
    }

    patch<T>(url: string, data: any, config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.wrap<T>(url, data, config, this.httpService.patch<T>);
    }
}