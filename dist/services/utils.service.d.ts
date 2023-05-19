import { AxiosResponse, AxiosError } from "axios";
import { Observable } from "rxjs";
export declare class UtilsService {
    obsToPromise<T = any>(obs: Observable<AxiosResponse<T>>): Promise<AxiosResponse<T> | AxiosError<T>>;
}
