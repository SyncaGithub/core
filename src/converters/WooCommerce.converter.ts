import {ClientDocument, ProductDocument, UserDocument} from '../models';
import {EClientType, IWooCommerce_Product} from '../types';

export interface IWooCommerceConverter {
    convertProductToWooCommerceFormat: (product: ProductDocument, token: string, store_id: number) => Partial<IWooCommerce_Product>;
    convertProductToSyncaFormat: (product: IWooCommerce_Product) => Partial<ProductDocument>;
    // convertOrderToSyncaFormat: () => {};
    // convertOrderToCashcowFormat: () => {};
}
export class WooCommerceConverter {

    static convertProductToSyncaFormat(product: IWooCommerce_Product, client: ClientDocument): Partial<ProductDocument>{
        const temp = {
            sellPrice: Number(product.regular_price),
            images: product.images.map(i => i.src),
            thirdPartyIds: new Map(),
            sellBarcode: product.sku,
            isApprovedForWeb: true,
            name: product.name,
            category: product.categories?.[0].name,
            description: product.description,
            qty: product.stock_quantity,
            clientType: EClientType.WOOCOMMERCE,
            user: client.user,
            client: client._id
        }
        temp.thirdPartyIds.set(client._id, product.id.toString())
        return temp;
    }

    static convertProductToWooCommerceFormat(
        product: ProductDocument,
        client: ClientDocument,
        isExisting = false
    ): Partial<IWooCommerce_Product> {
        const id = Number(product.thirdPartyIds.get(client._id));
        const temp: Partial<IWooCommerce_Product> = {
            id: isNaN(id) ? undefined : id,
            sku: product.sellBarcode,
            status: "publish",
            catalog_visibility: "visible",
            description: product.description,
            stock_status: product.hasQty ? 'instock' : 'outofstock',
            regular_price: product.sellPrice.toString(),
            name: product.name,
            images: product.images?.map(imgSrc => ({src: imgSrc, name: product.name, alt: product.name})),
        };

        if(!isExisting){
            temp.name = `${temp.name} (חדש) `;
            //TODO: should be handled with db when there more customers with wordpress
            if(client.isTempCategory){temp.categories = [{name: client.tempCategory}];}
        }

        if (isExisting) {
            client.wooCommerce
                .keysToIgnoreInExistingProduct
                ?.forEach(key => delete temp[key]);
        }
        return temp;
    }
}