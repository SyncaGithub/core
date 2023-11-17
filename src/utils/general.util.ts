import { catchError, Observable, take, tap } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";

// Utills
export function delay(ms: number): Promise<void> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve();
		}, ms);
	});
}

export function get(object, path: string | string[], defval = null, paths = []) {
	if(path === undefined) return defval;
	if (typeof path === 'object') {
		if(path.length === 0) return defval;
		const temp = path.shift()
		paths = path;
		path = temp;
	}
    if (typeof path === "string") path = path.split(".");

    const res = path.reduce((xs, x) => (typeof xs !== "string" && xs !== undefined && xs[x] !== undefined ? xs[x] : defval), object);

	if(res === defval && path.length > 0) return get(object, paths.shift(), defval, paths);
	return res;
}

export function arrayToChunkArray<T>(array: T[], chunkSize: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		const end = Math.min(i + chunkSize, array.length);
		chunks.push(array.slice(i, end));
	}
	return chunks;
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