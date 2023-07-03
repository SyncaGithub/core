import { ClientDocument, ProductDocument } from '../models';
import {IWooCommerce_Product} from '../types';

export interface IWooCommerceConverter {
    convertProductToWooCommerceFormat: (product: ProductDocument, token: string, store_id: number) => Partial<IWooCommerce_Product>;
    // convertProductToSyncaFormat: () => {};
    // convertOrderToSyncaFormat: () => {};
    // convertOrderToCashcowFormat: () => {};
}
export class WooCommerceConverter {

    static convertProductToWooCommerceFormat(
        product: ProductDocument,
        client: ClientDocument,
        isExisting = false
    ): Partial<IWooCommerce_Product> {
        const temp: Partial<IWooCommerce_Product> = {
            sku: product.sellBarcode,
            status: "publish",
            catalog_visibility: "visible",
            description: product.description,
            stock_status: product.qty > 0 ? 'instock' : 'outofstock',
            regular_price: product.sellPrice.toString(),
            name: product.name,
            images: product.images.map(imgSrc => ({src: imgSrc, name: product.name, alt: product.name})),
        };

        if(!isExisting && client.isTempCategory){
            temp.categories = [{name: client.tempCategory}];
        }

        if (isExisting) {
            client.cashcow
                .keysToIgnoreInExistingProduct
                ?.forEach(key => delete temp[key]);
        }
        return temp;
    }
}