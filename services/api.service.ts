import {Injectable, Logger} from "@nestjs/common";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {LogRepo} from "../repositories/Log.repo";

@Injectable()
export class ApiService {
    private readonly logger = new Logger(ApiService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly logRepo: LogRepo
    ) {}

    // Todo: Maybe in the future return Observable<T> instead of Observable<AxiosResponse<T>>
    wrap<T>(url: string, data: any, config: AxiosRequestConfig, requestFn: () => Observable<AxiosResponse<T, any>>): Observable<AxiosResponse<T>> {
        const startTime = Date.now();
        this.logger.log(`Try to send new request with t he next parameters: \n ${JSON.stringify({url,data,config}, null,4)}`);
        this.logger.log(`Function name: ${requestFn.name}`);
        const requestPayload = data;
        const requestHeaders = config;
        return requestFn().pipe(
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

                this.logRepo.add(logData)// Save the log data to the database
                    .then(data => console.log({data}), err => console.log({err}));
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

                this.logRepo.add(logData) // Save the log data to the database
                    .then(data => console.log({data}), err => console.log({err}));
                return throwError(() => error);
            }),
            // map((response: AxiosResponse<T>) => response.data),
        );
    }

    get<T = any>(url: string, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, undefined, config, () => this.httpService.get(url, config));
    }

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, data, config, () => this.httpService.post(url, data, config));
    }

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, data, config, () => this.httpService.put(url, data, config));
    }

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, data, config, () => this.httpService.patch(url, data, config));
    }

    delete<T = any>(url: string, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, undefined, config, () => this.httpService.delete(url, config));
    }
}