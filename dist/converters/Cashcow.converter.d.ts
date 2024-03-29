import { ClientDocument, ProductDocument } from '../models';
import { ICashcowAddOrUpdateObject, ICashcowUpdateOrderRequest, IOrder } from '../types';
export interface ICashcowConverter {
    convertProductToCashcowFormat: (product: ProductDocument, token: string, store_id: number) => {};
}
export declare class CashcowConverter {
    static convertProductToCashcowFormat(product: ProductDocument, client: ClientDocument, isExisting?: boolean): ICashcowAddOrUpdateObject;
    static generateUpdateOrderObject(order: IOrder, client: ClientDocument): ICashcowUpdateOrderRequest;
}
