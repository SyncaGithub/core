import { Observable, take } from "rxjs";
import { AxiosResponse } from "axios";

// Utills
export const obsToPromise = <T = any>(
	obs: Observable<AxiosResponse<T>>
): Promise<T> => {
	return new Promise((resolve, reject) => {
		obs.pipe(take(1)).subscribe({
			error: (err) => reject(err),
			next: (res) => resolve(res.data),
		});
	});
};
