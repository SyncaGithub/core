import {ClientDocument, JobDocument, ProductDocument} from '../models';
import {ECashcowOrderStatus, ICashcowAddOrUpdateObject, ICashcowUpdateOrderRequest} from '../types';

export interface ICashcowConverter {
    convertProductToCashcowFormat: (product: ProductDocument, token: string, store_id: number) => {};
    // convertProductToSyncaFormat: () => {};
    // convertOrderToSyncaFormat: () => {};
    // convertOrderToCashcowFormat: () => {};
}
export class CashcowConverter {

    static convertProductToCashcowFormat(
        product: ProductDocument,
        client: ClientDocument,
        isExisting = false
    ): ICashcowAddOrUpdateObject {
        const temp: ICashcowAddOrUpdateObject = {
            token: client.cashcow.token,
            store_id: client.cashcow.store_id,
            is_override_existing_product: true,
            is_restore_deleted_items: true,
            sku: product.sellBarcode,
            prices: {
                retail_price: product.sellPrice ,
                sell_price: product.discountPrice ?? 0,
                cost_price: product.costPrice ?? 0,
            },
            title: product.name,
            main_category_name: product.category,
            images: {
                main_image_url: product.compressedImageUrl || product.mainImage
            },
            qty: product.qty,
            is_visible: product.isActive && product.isApprovedForWeb && product.qty > 0 && product.sellPrice > 0
        };
        if (!temp.images?.main_image_url) {
            delete temp.images;
        }
        if(!isExisting && client.isTempCategory){
            temp.main_category_name = client.tempCategory;
        }

        if (isExisting) {
            client.cashcow
                .keysToIgnoreInExistingProduct
                ?.forEach(key => delete temp[key]);
        }
        return temp;
    }

    static generateUpdateOrderObject(job: JobDocument, client: ClientDocument): ICashcowUpdateOrderRequest{
        return {
            token: client.cashcow.token,
            store_id: client.cashcow.store_id,
            order_id: job.configuration.orders[0].Id,
            email_address: job.configuration.orders[0].Email,
            order_status_type: ECashcowOrderStatus.Claimed
        };
    }
}