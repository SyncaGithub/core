import { catchError, Observable, take, tap } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";

// Utills
export function get(object, path, defval = null) {
    if (typeof path === "string") path = path.split(".");
    return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object);
}

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

export const getISOInIsraelTimezone = (): string => {
	const tempDate = new Date();
    const currentMonth = tempDate.getMonth() + 1;
    const currentDay = tempDate.getDay() + 1;
    let isSummer = false;
    if(currentMonth >= 3 && currentMonth <= 10){
      isSummer = true;
      if(currentMonth === 3 && currentDay < 24){isSummer = false;}
      if(currentMonth === 10 && currentDay > 29){isSummer = false;}
    }
    const hoursOffset = isSummer ? 3 : 2;
    tempDate.setHours(tempDate.getHours() + hoursOffset);
	return tempDate.toISOString();
}