import { Observable } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";
export declare function delay(ms: number): Promise<void>;
export declare function get(object: any, path: string | string[], defval?: any, paths?: any[]): any;
export declare function arrayToChunkArray<T>(array: T[], chunkSize: number): T[][];
export declare const obsToPromise: <T = any>(obs: Observable<AxiosResponse<T, any>>) => Promise<AxiosResponse<T, any> | AxiosError<T, any>>;
export declare const getISOInIsraelTimezone: () => string;
