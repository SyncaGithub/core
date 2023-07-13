import { ClientDocument, IRaw, ProductDocument } from '../models';
export interface IGenericConverter {
    convertProductToSyncaFormat(rawProduct: any, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
}
export declare class GenericConverter {
    static convertProductToSyncaFormat(rawProduct: any, client: ClientDocument, lastUpdateISO?: string): Partial<ProductDocument<IRaw>>;
}
