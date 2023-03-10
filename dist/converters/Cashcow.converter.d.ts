import { ClientDocument, ProductDocument } from '../models';
import { ICashcowAddOrUpdateObject } from '../types';
export interface ICashcowConverter {
    convertProductToCashcowFormat: (product: ProductDocument, token: string, store_id: number) => {};
}
export declare class CashcowConverter {
    static convertProductToCashcowFormat(product: ProductDocument, client: ClientDocument, isExisting?: boolean): ICashcowAddOrUpdateObject;
}
//# sourceMappingURL=Cashcow.converter.d.ts.map