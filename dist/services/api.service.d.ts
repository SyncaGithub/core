import { Observable } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { LogRepo } from "../repositories/Log.repo";
export declare class ApiService {
    private readonly httpService;
    private readonly logRepo;
    private readonly logger;
    constructor(httpService: HttpService, logRepo: LogRepo);
    wrap<T>(url: string, data: any, config: AxiosRequestConfig, method: string, requestFn: () => Observable<AxiosResponse<T, any>>): Observable<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig<any>): Observable<AxiosResponse<T, any>>;
    getImageSize(imageUrl: string, retryCount?: number, maxRetries?: number): Promise<string | undefined>;
}
