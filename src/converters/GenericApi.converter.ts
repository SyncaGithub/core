import {ClientDocument, IRaw, ProductDocument} from '../models';
import {EClientType} from '../types';
import {get} from '../utils';

export interface IGenericConverter {
    convertProductToSyncaFormat(rawProduct: any, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
}

export class GenericConverter {

    static convertProductToSyncaFormat(rawProduct: any, client: ClientDocument, lastUpdateISO?: string): Partial<ProductDocument<IRaw>> {

        const temp: Partial<ProductDocument<IRaw>> = {};
        for(let key in client.genericApi.productMap){
            temp[key] = get(rawProduct, Array.from(client.genericApi.productMap[key] ?? []), undefined);
        }
        temp.lastUpdate = lastUpdateISO;
        temp.client = client._id;
        temp.user = client.user;
        temp.clientType = EClientType.GENERIC;
        temp.hasQty = !!temp.hasQty;
        temp.sellPrice = Number(temp.sellPrice);
        temp.isApprovedForWeb = temp.hasQty || (temp.qty > 0 && temp.sellPrice > 0);
        return temp;
    }


}

