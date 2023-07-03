import {ClientDocument, ProductDocument, UserDocument} from '../models';
import {EClientType, IWooCommerce_Product} from '../types';

export interface IWooCommerceConverter {
    convertProductToWooCommerceFormat: (product: ProductDocument, token: string, store_id: number) => Partial<IWooCommerce_Product>;
    convertProductToSyncaFormat: (product: IWooCommerce_Product) => Partial<ProductDocument>;
    // convertOrderToSyncaFormat: () => {};
    // convertOrderToCashcowFormat: () => {};
}
export class WooCommerceConverter {

    static convertProductToSyncaFormat(product: IWooCommerce_Product, user: UserDocument, client: ClientDocument): Partial<ProductDocument>{
        return {
            sellPrice: Number(product.regular_price),
            images: product.images.map(i => i.src),
            thirdPartyId: product.id.toString(),
            sellBarcode: product.sku,
            isApprovedForWeb: true,
            name: product.name,
            category: product.categories?.[0].name,
            description: product.description,
            qty: product.stock_quantity,
            clientType: EClientType.WOOCOMMERCE,
            user: user.id,
            client: client._id
        }
    }

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
            client.wooCommerce
                .keysToIgnoreInExistingProduct
                ?.forEach(key => delete temp[key]);
        }
        return temp;
    }
}