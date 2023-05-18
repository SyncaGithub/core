import { Observable } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { LogRepo } from "../repositories/Log.repo";
export declare class ApiService {
    private readonly httpService;
    private readonly logRepo;
    private readonly logger;
    constructor(httpService: HttpService, logRepo: LogRepo);
    wrap<T>(url: string, data: any, config: AxiosRequestConfig, requestFn: (...arg: any) => Observable<AxiosResponse<T>>): Observable<AxiosResponse<T>>;
    get<T>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>>;
}
//# sourceMappingURL=api.service.d.ts.map