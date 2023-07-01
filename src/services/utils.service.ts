import { Injectable } from "@nestjs/common";
import { AxiosResponse, AxiosError } from "axios";
import { Observable, take, catchError, tap } from "rxjs";

@Injectable()
export class UtilsService {
	obsToPromise<T = any>(
		obs: Observable<AxiosResponse<T>>
	): Promise<AxiosResponse<T> | AxiosError<T>> {
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
	}
}
