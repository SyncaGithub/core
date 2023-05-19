import { ClientDocument, IRaw, ProductDocument } from '../models';
import { IRawPriorityProduct } from '../types';
export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
}
export declare class PriorityConverter {
    static convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument<IRaw>>;
    private static getName;
    private static getDescription;
    private static getQuantity;
    private static getCategories;
    private static getFutureOrders;
    private static getSellBarcode;
    private static getPrices;
    private static getPackageData;
    private static getImageEndpoint;
}
