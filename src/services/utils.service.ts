import {Injectable} from "@nestjs/common";
import {AxiosResponse, AxiosError} from "axios";
import {Observable, take, catchError, tap, lastValueFrom, firstValueFrom} from "rxjs";
import {ApiService} from "./api.service";
import {ICashcowProductAddOrUpdateResponse} from "../types";

@Injectable()
export class UtilsService {

    constructor(private httpService: ApiService) {
    }

    // Old Approach
    // async getImageSize(imageUrl: string, temps = 1): Promise<string> {
    //     const promise: () => Promise<string> = () =>
    //         new Promise((resolve, reject) => {
    //             this.httpService.get(imageUrl).subscribe({
    //                 next: (res) => {
    //                     return resolve(String(res.headers['content-length']));
    //                 },
    //                 error: (err) => reject(err)
    //             });
    //         });
    //     try {
    //         const result = await promise();
    //         return Promise.resolve(result);
    //     } catch (e: any) {
    //         if (temps < 2) return this.getImageSize(imageUrl, temps + 1);
    //         return Promise.resolve(undefined);
    //     }
    // }


}
