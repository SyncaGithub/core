import { ClientDocument, IRaw, ProductDocument } from '../models';
import { IOrder, IPrioritySendInvoice, IPrioritySendOrder, IRawPriorityProduct } from '../types';
export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
    productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[];
    convertOrderToPriorityOrderFormat(order: IOrder, client: ClientDocument): IPrioritySendOrder;
    convertOrderToPriorityInvoiceFormat(order: IOrder, client: ClientDocument): IPrioritySendInvoice;
}
export declare class PriorityConverter {
    static BarcodeSeparator: string;
    static PARTNAMESeparator: string;
    static productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[];
    static convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO?: string): Partial<ProductDocument<IRaw>>;
    static convertOrderToPriorityOrderFormat(order: IOrder, client: ClientDocument, currentProductsHashTable: {
        [key: string]: ProductDocument;
    }): IPrioritySendOrder;
    static convertOrderToPriorityInvoiceFormat(order: IOrder, client: ClientDocument): IPrioritySendInvoice;
    static getToken(client: ClientDocument): string;
    static generateProductsApiURL(client: ClientDocument): string;
    static generateProductsLookupApiURL(client: ClientDocument): string;
    private static generateInvoiceDateFormat;
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
