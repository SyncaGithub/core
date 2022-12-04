import { catchError, Observable, take, tap } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";

// Utills
export const obsToPromise = <T = any>(
	obs: Observable<AxiosResponse<T>>
): Promise<AxiosResponse<T> | AxiosError<T>> => {
	return new Promise((resolve, reject) => {
		obs.pipe(
			take(1),
			catchError((e: AxiosError<T>) => {
				resolve(e);
				throw e;
			}),
			tap((res: AxiosResponse<T>) => {
				return resolve(res);
			})
		);
	});
};
