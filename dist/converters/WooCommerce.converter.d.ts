import { ClientDocument, ProductDocument } from '../models';
import { IWooCommerce_Product } from '../types';
export interface IWooCommerceConverter {
    convertProductToWooCommerceFormat: (product: ProductDocument, token: string, store_id: number) => Partial<IWooCommerce_Product>;
    convertProductToSyncaFormat: (product: IWooCommerce_Product) => Partial<ProductDocument>;
}
export declare class WooCommerceConverter {
    static convertProductToSyncaFormat(product: IWooCommerce_Product): Partial<ProductDocument>;
    static convertProductToWooCommerceFormat(product: ProductDocument, client: ClientDocument, isExisting?: boolean): Partial<IWooCommerce_Product>;
}
