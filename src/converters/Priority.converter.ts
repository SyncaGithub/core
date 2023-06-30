import { ClientDocument, IRaw, ProductDocument } from '../models';
import { EClientType, EProductSellProperty, IPriority_LOGCOUNTERS_SUBFORM, IPriority_PARTBALANCE_SUBFORM, IPriority_PARTINCUSTPLISTS_SUBFORM, IPriority_PARTPACK_SUBFORM, IRawPriorityProduct, PriorityClientPriceKey } from '../types';
import { get } from '../utils';

export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
    productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[];
    // convertOrderToSyncaFormat(): void;
    // convertProductToPriorityFormat(): void;
    // convertOrderToPriorityFormat(): void;
}

export class PriorityConverter {

    static BarcodeSeparator = '-';
    static PARTNAMESeparator = '@';

    static productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[] {
        return rawProduct
            .ITAI_WS_TAGS
            .split(';')
            .map(subBarcodePostfix => ({
                ...rawProduct,
                PARTNAME: `${rawProduct.PARTNAME}${PriorityConverter.PARTNAMESeparator}${subBarcodePostfix}`,
                BARCODE: `${rawProduct.BARCODE}${PriorityConverter.BarcodeSeparator}${subBarcodePostfix}`
            }))
    }

    static convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument<IRaw>> {

        const futureOrdersFromClient = PriorityConverter.getFutureOrders(rawProduct.LOGCOUNTERS_SUBFORM);
        const { category, subcategory } = PriorityConverter.getCategories(rawProduct, client);
        const { isDisplay, displayQty, containerQty } = PriorityConverter.getPackageData(rawProduct.PARTPACK_SUBFORM);
        const { costPrice, sellPrice, discountPrice } = PriorityConverter.getPrices(client, rawProduct.PARTINCUSTPLISTS_SUBFORM, client.priority.priceKey as PriorityClientPriceKey, isDisplay, displayQty);
        const name = PriorityConverter.getName(rawProduct, client);
        const description = PriorityConverter.getDescription(rawProduct, client);
        const sellBarcode = PriorityConverter.getSellBarcode(rawProduct, client);
        const qty = PriorityConverter.getQuantity(client, rawProduct.LOGCOUNTERS_SUBFORM, rawProduct.PARTBALANCE_SUBFORM);
        const mainImage = PriorityConverter.getImageEndpoint(rawProduct[client.priority.productMap.mainImage[0]], client.priority.baseUrl);
        const isApprovedForWeb = PriorityConverter.getIsApprovedForWeb(rawProduct, client);
        return {
            user: client.user,
            clientType: EClientType.PRIORITY,
            client: client._id,
            sellBarcode,
            barcode: rawProduct.BARCODE,
            clientBarcode: rawProduct.PARTNAME,
            isDisplay: isDisplay,
            name,
            category: category,
            costPrice,
            sellPrice,
            discountPrice,
            qty,
            futureOrdersFromClient,
            displayQty,
            containerQty: containerQty,
            mainImage,
            subCategory: subcategory,
            description,
            lastUpdate: lastUpdateISO,
            isApprovedForWeb
        };
    }

    private static getIsApprovedForWeb(rawProduct: IRawPriorityProduct, client: ClientDocument) {
        return !(client.priority.productsBadStatuses ?? []).includes(rawProduct.STATDES);
    }

    private static getName(rawProduct: IRawPriorityProduct, client: ClientDocument) {
        let name = get(rawProduct, Array.from(client.priority.productMap.name ?? []), '');
        if (client.nickname === 'telbar-priority' && name.includes('(') && name.includes(')')) {
            name =
                name.substring(0, name.indexOf('(')) +
                name.substring(name.indexOf(')') + 1).trim(); // telbar request for removing parenthesis
        }
        return name;
        // let name = rawProduct.PARTDES || '';
        // switch (client.nickname) {
        //     case 'win-priority':
        //         name = rawProduct.ITAI_WS_NAME || '';
        //         break;
        //     case 'telbar-priority':
        //         if (!name.includes('(') || !name.includes(')')) return name;
        //         name =
        //             name.substring(0, name.indexOf('(')) +
        //             name.substring(name.indexOf(')') + 1).trim(); // telbar request for removing parenthesis
        //         break;

        //     default:
        //         name = rawProduct.PARTDES;
        //         break;
        // }
        // return name;
    }

    private static getDescription(rawProduct: IRawPriorityProduct, client: ClientDocument) {
        let description: string | undefined = undefined;
        switch (client.nickname) {
            case 'win-priority':
                description = rawProduct.ITAI_WS_DES;
                break;
            default:
                break;
        }
        return description;
    }

    private static getQuantity(
        client: ClientDocument,
        LOGCOUNTERS_SUBFORM: IPriority_LOGCOUNTERS_SUBFORM[],
        PARTBALANCE_SUBFORM: IPriority_PARTBALANCE_SUBFORM[]
    ): number {
        if (
            client.priority.isUsingSummaryPage &&
            LOGCOUNTERS_SUBFORM.length > 0
        ) {
            return PriorityConverter.getQuantityAfterExclusions(client, LOGCOUNTERS_SUBFORM[0].SELLBALANCE);
        }
        let quantity = 0;
        for (const obj of PARTBALANCE_SUBFORM) {
            if (
                client.priority.usingWARHSNAME.includes(obj.WARHSNAME.toString().toUpperCase())
            ) {
                if (client.nickname === 'rGallery Priority' && obj.LOCNAME === 'R') { continue; }
                quantity += obj.TBALANCE;
            }
        }
        if (client.priority.isRemovingOrdersFromQty && LOGCOUNTERS_SUBFORM[0]?.ORDERS) {
            quantity -= LOGCOUNTERS_SUBFORM[0].ORDERS;
        }

        return PriorityConverter.getQuantityAfterExclusions(client, quantity);
    }

    private static getQuantityAfterExclusions(client:ClientDocument, qty: number): number{
        if(!client.priority.minQty) return qty;
        return qty <= client.priority.minQty ? 0 : qty;
    }

    private static getCategories(rawProduct: IRawPriorityProduct, client: ClientDocument): {
        category: string;
        subcategory: string;
    } {
        let category = '',
            subcategory = '';
        switch (client.nickname) {
            case 'telbar-priority':
                category =
                    rawProduct.SPEC2 || rawProduct.FTNAME || rawProduct.FAMILYDES;
                // subcategory = rawProduct.FTNAME;
                break;

            default:
                category = rawProduct.FAMILYDES;
                break;
        }
        return { category, subcategory };
    }

    private static getFutureOrders(
        LOGCOUNTERS_SUBFORM: IPriority_LOGCOUNTERS_SUBFORM[]
    ) {
        if (LOGCOUNTERS_SUBFORM?.length === 0) return;
        return LOGCOUNTERS_SUBFORM?.[0]?.PORDERS;
    }

    private static getSellBarcode(rawProduct: IRawPriorityProduct, client: ClientDocument) {
        let sellBarcode = '';
        switch (client.priority.sellBarcodeKey) {
            case EProductSellProperty.SKU:
                sellBarcode = client.barcodeTag
                    ? client.barcodeTag + rawProduct.PARTNAME
                    : rawProduct.PARTNAME;
                break;

            // case EProductSellProperty.BARCODE
            default: sellBarcode = client.barcodeTag
                ? client.barcodeTag + rawProduct.BARCODE
                : rawProduct.BARCODE;
                break;

        }
        return sellBarcode;
    }

    private static getPrices(
        client: ClientDocument,
        PARTINCUSTPLISTS_SUBFORM: IPriority_PARTINCUSTPLISTS_SUBFORM[],
        priceKey: PriorityClientPriceKey,
        isDisplay: boolean,
        displayQty?: number
    ): { costPrice?: number; sellPrice?: number, discountPrice?: number } {
        let costPrice: number | undefined;
        let sellPrice: number | undefined;
        let discountPrice: number | undefined;
        if (!PARTINCUSTPLISTS_SUBFORM || PARTINCUSTPLISTS_SUBFORM.length === 0) {
            return { costPrice, sellPrice, discountPrice };
        }

        switch (client.nickname) {
            case 'win-priority':
                for (let pList of PARTINCUSTPLISTS_SUBFORM) {
                    if (pList.PLNAME === '80') {
                        sellPrice = pList.VATPRICE;
                    }
                    if (pList.PLNAME === '80-1') {
                        discountPrice = pList.VATPRICE;
                    }
                }
                break;
            case 'rGallery Priority':
                sellPrice = PARTINCUSTPLISTS_SUBFORM[0][priceKey];
                break;
            default:
                costPrice = PARTINCUSTPLISTS_SUBFORM[0][priceKey];
                break;
        }

        if (costPrice !== undefined) {
            sellPrice = costPrice * client.sellPriceMultiple;
            // sellPrice = isDisplay && displayQty? sellPrice * displayQty : sellPrice;
            let temp = sellPrice.toFixed(2);
            sellPrice = Number(temp.substring(0, temp.length - 1) + '0');
        }

        return {
            costPrice,
            discountPrice,
            sellPrice
        };
    }

    private static getPackageData(PARTPACK_SUBFORM: IPriority_PARTPACK_SUBFORM[]): {
        isDisplay: boolean;
        displayQty?: number;
        containerQty?: number;
    } {
        if (!PARTPACK_SUBFORM)
            return { isDisplay: false };
        let isDisplay = false;
        let displayQty: number | undefined;
        let containerQty: number | undefined;

        let foundMaster = false;
        for (let packType of PARTPACK_SUBFORM) {
            if (packType.PACKNAME === 'דיספליי') {
                isDisplay = true;
                displayQty = packType.PACKQUANT;
            }

            if (packType.PACKNAME === 'קרטון' || packType.PACKNAME === 'מאסטר') {
                foundMaster = true;
                containerQty = packType.PACKQUANT;
            }
        }
        if (!foundMaster && PARTPACK_SUBFORM.length > 0 && !containerQty) {
            containerQty =
                PARTPACK_SUBFORM.find((val) => val.PACKNAME === 'מינימום להזמנה')
                    ?.PACKQUANT;
        }
        return { isDisplay, displayQty, containerQty };
    }

    private static getImageEndpoint(filePath: string, baseUrl: string): string {
        if (!filePath) {
            return '';
        }
        while (filePath.indexOf('\\') !== -1) {
            filePath = filePath.replace('\\', '/');
        }
        if (!baseUrl) {
            return '';
        }
        if (filePath.startsWith('jpg.')) {
            filePath = filePath.replace('/../..', '');
            const fileName =
                filePath.substring(4, filePath.indexOf('system/')) +
                filePath.substring(filePath.lastIndexOf('/') + 1) +
                '.jpg';
            filePath =
                '../../' +
                filePath.substring(
                    filePath.indexOf('system/'),
                    filePath.lastIndexOf('/') + 1
                ) +
                fileName;
        }
        if (filePath.startsWith('../../system/images')) {
            // Telbar images path
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
            baseUrl = baseUrl?.substring(0, baseUrl.indexOf('/odata'));
            return baseUrl + '/priimages/' + fileName;
        }
        baseUrl = baseUrl?.substring(0, baseUrl.indexOf('/odata'));
        const start = baseUrl + '/primail/';
        const result = start + filePath.substring(filePath.indexOf('mail/') + 5);
        return result;
    }
}

