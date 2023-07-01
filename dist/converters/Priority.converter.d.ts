import { ClientDocument, IRaw, ProductDocument } from '../models';
import { IRawPriorityProduct } from '../types';
export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
    productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[];
}
export declare class PriorityConverter {
    static BarcodeSeparator: string;
    static PARTNAMESeparator: string;
    static productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[];
    static convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO?: string): Partial<ProductDocument<IRaw>>;
    private static getIsApprovedForWeb;
    private static getName;
    private static getDescription;
    private static getQuantity;
    private static getQuantityAfterExclusions;
    private static getCategories;
    private static getFutureOrders;
    private static getSellBarcode;
    private static getPrices;
    private static getPackageData;
    private static getImageEndpoint;
}
