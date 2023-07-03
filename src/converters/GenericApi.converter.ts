import { ClientDocument, IRaw, ProductDocument } from '../models';
import { EClientType, EProductSellProperty, IPriority_LOGCOUNTERS_SUBFORM, IPriority_PARTBALANCE_SUBFORM, IPriority_PARTINCUSTPLISTS_SUBFORM, IPriority_PARTPACK_SUBFORM, IRawPriorityProduct, PriorityClientPriceKey } from '../types';
import { get } from '../utils';

export interface IGenericConverter {
    convertProductToSyncaFormat(rawProduct: any, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
}

export class GenericConverter {

    static convertProductToSyncaFormat(rawProduct: any, client: ClientDocument, lastUpdateISO?: string): Partial<ProductDocument<IRaw>> {

        // const futureOrdersFromClient = PriorityConverter.getFutureOrders(rawProduct.LOGCOUNTERS_SUBFORM);
        // const { category, subcategory } = PriorityConverter.getCategories(rawProduct, client);
        // const { isDisplay, displayQty, containerQty } = PriorityConverter.getPackageData(rawProduct.PARTPACK_SUBFORM);
        // const { costPrice, sellPrice, discountPrice } = PriorityConverter.getPrices(client, rawProduct.PARTINCUSTPLISTS_SUBFORM, client.priority.priceKey as PriorityClientPriceKey, isDisplay, displayQty);
        // const name = PriorityConverter.getName(rawProduct, client);
        // const description = PriorityConverter.getDescription(rawProduct, client);
        // const sellBarcode = PriorityConverter.getSellBarcode(rawProduct, client);
        // const qty = PriorityConverter.getQuantity(client, rawProduct.LOGCOUNTERS_SUBFORM, rawProduct.PARTBALANCE_SUBFORM);
        // const mainImage = PriorityConverter.getImageEndpoint(rawProduct[client.priority.productMap.mainImage[0]], client.priority.baseUrl);
        // const isApprovedForWeb = PriorityConverter.getIsApprovedForWeb(rawProduct, client);

        const temp: Partial<ProductDocument<IRaw>> = {};
        for(let key in client.genericApi.productMap){
            temp[key] = get(rawProduct, Array.from(client.genericApi.productMap.name ?? []), undefined);
        }
        // temp.sell
        temp.lastUpdate = lastUpdateISO;
        temp.isApprovedForWeb = true;
        return temp;
        // return {
        //     user: client.user,
        //     clientType: EClientType.PRIORITY,
        //     client: client._id,
        //     sellBarcode,
        //     barcode: rawProduct.BARCODE,
        //     clientBarcode: rawProduct.PARTNAME,
        //     isDisplay: isDisplay,
        //     name,
        //     category: category,
        //     costPrice,
        //     sellPrice,
        //     discountPrice,
        //     qty,
        //     futureOrdersFromClient,
        //     displayQty,
        //     containerQty: containerQty,
        //     mainImage,
        //     subCategory: subcategory,
        //     description,
        //     lastUpdate: lastUpdateISO,
        //     isApprovedForWeb
        // };
    }


}

