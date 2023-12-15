import {Injectable, Logger} from "@nestjs/common";
import {catchError, firstValueFrom, map, Observable, tap, throwError} from "rxjs";
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
    wrap<T>(url: string, data: any, config: AxiosRequestConfig, method: string, requestFn: () => Observable<AxiosResponse<T, any>>): Observable<AxiosResponse<T>> {
        const startTime = Date.now();
        const requestPayload = data;
        const requestHeaders = config;
        return requestFn().pipe(
            tap((response: AxiosResponse<T>) => {
                const endTime = Date.now();
                const responsePayload = response.data;
                const responseStatusCode = response.status;

                const logData = {
                    url: url,
                    method: method,
                    startTime,
                    endTime,
                    requestPayload,
                    requestHeaders,
                    // responsePayload,
                    responseStatusCode,
                    success: true,
                };

                this.logRepo.add(logData)// Save the log data to the database
                    .then(data => {/* If success do nothing */}, err => console.log({err}));
            }),
            catchError((error: AxiosError<T>) => {
                const endTime = Date.now();
                const responsePayload = error.response?.data;
                const responseStatusCode = error.response?.status;

                const logData = {
                    url: url,
                    method: method,
                    startTime,
                    endTime,
                    requestPayload,
                    requestHeaders,
                    responsePayload,
                    responseStatusCode,
                    success: false,
                };

                this.logRepo.add(logData) // Save the log data to the database
                    .then(data => console.log({data}), err => console.log({err}));
                return throwError(() => error);
            }),
            // map((response: AxiosResponse<T>) => response.data),
        );
    }

    get<T = any>(url: string, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, undefined, config, 'get', () => this.httpService.get(url, config));
    }

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, data, config, 'post', () => this.httpService.post(url, data, config));
    }

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, data, config, 'put', () => this.httpService.put(url, data, config));
    }

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, data, config, 'patch', () => this.httpService.patch(url, data, config));
    }

    delete<T = any>(url: string, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>> {
        return this.wrap<T>(url, undefined, config, 'delete', () => this.httpService.delete(url, config));
    }

    async getImageSize(imageUrl: string, retryCount = 0, maxRetries = 2): Promise<string | undefined> {
        try {
            const response = await firstValueFrom(
                this.get(imageUrl).pipe(
                    catchError((error: AxiosError) => {
                        throw new Error('Failed to fetch image size');
                    }),
                ),
            );

            if (!response.headers['content-type']?.toUpperCase().startsWith('IMAGE/')) {
                throw new Error('URL does not point to an image');
            }

            return response.headers['content-length'] ?? undefined;
        } catch (error) {
            // Handle or log the error as needed
            if (retryCount < maxRetries) {
                console.log(`Retires Failed: ${retryCount}`);
                return this.getImageSize(imageUrl, retryCount + 1, maxRetries);
            }
            return undefined;
        }
    }
}