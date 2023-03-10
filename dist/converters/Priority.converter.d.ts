import { ClientDocument, IRaw, PriorityClientConfiguration, ProductDocument } from '../models';
import { IRawPriorityProduct } from '../types';
export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument<PriorityClientConfiguration>, lastUpdateISO: string): Partial<ProductDocument>;
}
export default class PriorityConverter implements IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument<PriorityClientConfiguration, IRaw>, lastUpdateISO: string): Partial<ProductDocument<IRaw>>;
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