import { ClientDocument, JobDocument, ProductDocument } from '../models';
import { ICashcowAddOrUpdateObject, ICashcowUpdateOrderRequest } from '../types';
export interface ICashcowConverter {
    convertProductToCashcowFormat: (product: ProductDocument, token: string, store_id: number) => {};
}
export declare class CashcowConverter {
    static convertProductToCashcowFormat(product: ProductDocument, client: ClientDocument, isExisting?: boolean): ICashcowAddOrUpdateObject;
    static generateUpdateOrderObject(job: JobDocument, client: ClientDocument): ICashcowUpdateOrderRequest;
}
