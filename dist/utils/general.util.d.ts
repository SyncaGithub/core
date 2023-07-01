import { Observable } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";
export declare function get(object: any, path: string | string[], defval?: any, paths?: any[]): any;
export declare const obsToPromise: <T = any>(obs: Observable<AxiosResponse<T, any>>) => Promise<AxiosResponse<T, any> | AxiosError<T, any>>;
export declare const getISOInIsraelTimezone: () => string;
