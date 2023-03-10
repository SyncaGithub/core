import { ClientDocument, IRaw, ProductDocument } from '../models';
import { IRawPriorityProduct } from '../types';
export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
}
export declare class PriorityConverter implements IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument<IRaw>>;
    private getName;
    private getDescription;
    private getQuantity;
    private getCategories;
    private getFutureOrders;
    private getSellBarcode;
    private getPrices;
    private getPackageData;
    private getImageEndpoint;
}
//# sourceMappingURL=Priority.converter.d.ts.map