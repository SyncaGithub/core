import { Observable } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";
export declare const obsToPromise: <T = any>(obs: Observable<AxiosResponse<T, any>>) => Promise<AxiosResponse<T, any> | AxiosError<T, any>>;
//# sourceMappingURL=general.util.d.ts.map