import { ClientDocument, ProductDocument } from '../models';
import { IWooCommerce_Product } from '../types';
export interface IWooCommerceConverter {
    convertProductToWooCommerceFormat: (product: ProductDocument, token: string, store_id: number) => Partial<IWooCommerce_Product>;
}
export declare class WooCommerceConverter {
    static convertProductToWooCommerceFormat(product: ProductDocument, client: ClientDocument, isExisting?: boolean): Partial<IWooCommerce_Product>;
}
