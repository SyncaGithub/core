import { ClientDocument, IRaw, ProductDocument } from '../models';
import {DateTime, Duration} from 'luxon';
import {
    ECashcowOrderPaymentType,
    EClientType,
    EProductSellProperty,
    IOrder,
    IPriority_LOGCOUNTERS_SUBFORM, IPriority_ORDERITEMS_SUBFORM,
    IPriority_PARTBALANCE_SUBFORM,
    IPriority_PARTINCUSTPLISTS_SUBFORM,
    IPriority_PARTPACK_SUBFORM, IPrioritySendInvoice, IPrioritySendOrder,
    IRawPriorityProduct,
    PriorityClientPriceKey, PriorityShippingMethods, PriorityShippingMethodsName
} from '../types';
import { get } from '../utils';

export interface IPriorityConverter {
    convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO: string): Partial<ProductDocument>;
    productWithSubBarcodesToProducts(rawProduct: IRawPriorityProduct): IRawPriorityProduct[];
    // convertOrderToSyncaFormat(): void;
    // convertProductToPriorityFormat(): void;
    convertOrderToPriorityOrderFormat(order: IOrder, client: ClientDocument): IPrioritySendOrder;
    convertOrderToPriorityInvoiceFormat(order: IOrder, client: ClientDocument): IPrioritySendInvoice;
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

    static convertProductToSyncaFormat(rawProduct: IRawPriorityProduct, client: ClientDocument, lastUpdateISO?: string): Partial<ProductDocument<IRaw>> {

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

    static convertOrderToPriorityOrderFormat(order: IOrder, client: ClientDocument, currentProductsHashTable: {
        [key: string]: ProductDocument;
    }): IPrioritySendOrder{
        const orderProducts: IPriority_ORDERITEMS_SUBFORM[] = order.Products.map(
            (oP) => ({
                PARTNAME: currentProductsHashTable[oP.sku].clientBarcode,
                TQUANT: oP.Qty
            })
        );
        if (
            client.minPriceForFreeDelivery &&
            client.deliveryBarcode &&
            order.TotalPrice < client.minPriceForFreeDelivery &&
            !order.IsSelfDelivery
        ) {
            orderProducts.push({
                PARTNAME: client.deliveryBarcode,
                TQUANT: 1
            });
        }
        const totalPrice = order.CuponDiscountPrice ? (order.CuponDiscountPrice + order.TotalPrice) : order.TotalPrice;
        const discountPrice = order.CuponDiscountPrice ? ((order.CuponDiscountPrice * 100) / totalPrice) : undefined;
        return {
            AGENTNAME: client.priority.agentName,
            CUSTNAME: client.priority.customerNumber,
            QPRICE: totalPrice,
            PERCENT: discountPrice,
            SHIPTO2_SUBFORM: {
                EMAIL: order.Email,
                ADDRESS: order.Address + ', ' + order.StreetNameAndNumber,
                ADDRESS2:
                    'מספר קומה: ' +
                    order.FloorNumber +
                    ', מספר דירה' +
                    order.ApartmentNumber,
                STATE: order.City,
                PHONENUM: order.Phone,
                CUSTDES: order.FirstName + ' ' + order.LastName
            },
            ORDERITEMS_SUBFORM: orderProducts,
            CDES: order.FirstName + ' ' + order.LastName + ' ' + order.Phone,
            TYPECODE: order.IsSelfDelivery
                ? PriorityShippingMethods.PICK_UP
                : PriorityShippingMethods.Shipping,
            TYPEDES: order.IsSelfDelivery
                ? PriorityShippingMethodsName.PICK_UP
                : PriorityShippingMethodsName.Shipping,
            DETAILS: `${order.Id}`
        };
    }

    static convertOrderToPriorityInvoiceFormat(order: IOrder, client: ClientDocument): IPrioritySendInvoice{
        return {
            ACCNAME: client.priority.customerNumber,
            CASHNAME: client.priority.cashNumber,
            TPAYMENT2_SUBFORM: [
                {
                    PAYACCOUNT: order.LastDigits,
                    PAYDATE: PriorityConverter.generateInvoiceDateFormat(order.OrderDate),
                    QPRICE: order.TotalPrice,
                    PAYMENTCODE: [ECashcowOrderPaymentType.Paypal, ECashcowOrderPaymentType.PaypalExpress].includes(order.PaymentOptionType)
                        ? client.priority.paymentCodePaypal
                        : client.priority.paymentCode
                }
            ]
        }
    }

    static getToken(client: ClientDocument): string {
        return Buffer.from(
            `${client.priority.username}:${client.priority.password}`
        ).toString('base64');
    }

    static generateProductsApiURL(
        client: ClientDocument
        // isfullFetch: boolean = false
    ): string {
        const select = client.priority.getProductsSelect
            ? '&$select=' + client.priority.getProductsSelect
            : '';
        const filters = [...client.priority.getProductsFilters];
        let filter = '';

        if (filters.length > 0) {
            filter += '&$filter=(';
            for (let i = 0; i < filters.length; i++) {
                if (i !== 0) {
                    filter += ' and ';
                }
                filter += `${filters[i].key} ${filters[i].operator} '${filters[i].value}'`;
            }
            filter += ')';
        }

        // if (!isfullFetch && client.lastUpdate) {
        // 	const tempLastFetch = new Date(client.lastUpdate);
        // 	tempLastFetch.setDate(tempLastFetch.getDate() - 1);
        // 	filter += filter === '' ? '&$filter=(' : 'and (';
        // 	const dates = [
        // 		'UDATE',
        // 		'COSTDATE',
        // 		'SALETRANSDATE',
        // 		'PURTRANSDATE',
        // 		'WARHSTRANSDATE'
        // 	];
        // 	for (let date of dates) {
        // 		filter += `${date} ge ${tempLastFetch.toISOString()}`;
        // 		if (date !== 'WARHSTRANSDATE') {
        // 			filter += ` or `;
        // 		}
        // 	}
        // 	filter += ')';
        // }
        const tempLastFetch = client.lastUpdate
            ? DateTime.fromISO(client.lastUpdate, {zone: process.env.TZ})
            : DateTime.local({zone: process.env.TZ}).minus(Duration.fromObject({year: 1}));
        filter += filter === '' ? '&$filter=(' : 'and (';
        const dates = [
            'UDATE',
            'COSTDATE',
            'SALETRANSDATE',
            'PURTRANSDATE',
            'WARHSTRANSDATE'
        ];
        for (let date of dates) {
            filter += `${date} ge ${tempLastFetch.toISO({includeOffset: false}) + 'Z'}`;
            if (date !== 'WARHSTRANSDATE') {
                filter += ` or `;
            }
        }
        filter += ')';
        let endPoint =
            client.priority.baseUrl + client.priority.productsEndPoint + '?';
        endPoint += client.priority.getProductsExpand
            ? client.priority.getProductsExpand
            : '';
        endPoint += select ? select : '';
        endPoint += filter ? filter : '';
        return endPoint;
    }


    static generateProductsLookupApiURL(
        client: ClientDocument
    ): string {
        const {baseUrl, productsEndPoint, getProductsFilters} = client.priority;

        const filters = [...getProductsFilters];
        let filter = '';

        const opposite = {
            'eq': 'ne',
            'ne': 'eq'
        }

        if (filters.length > 0) {
            filter += '&$filter=(';
            for (let i = 0; i < filters.length; i++) {
                if (i !== 0) {
                    filter += ' and ';
                }
                filter += `${filters[i].key} ${opposite[filters[i].operator]} '${filters[i].value}'`;
            }
            filter += ')';
        }

        const select = '&$select=BARCODE,PARTNAME';
        let endPoint = `${baseUrl}${productsEndPoint}?${select}${filter}`;
        return endPoint;
    }

    private static generateInvoiceDateFormat(notFormatedDate: string): string {
        const tempDate = DateTime.fromISO(notFormatedDate, {zone: process.env.TZ});

        const date = notFormatedDate.split('T')[0];
        const hour = String(tempDate.hour).padStart(2, '0');
        const min = String(tempDate.minute).padStart(2, '0');
        return `${date}T${hour}:${min}:00+02:00`;
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
            LOGCOUNTERS_SUBFORM?.length > 0
        ) {
            return PriorityConverter.getQuantityAfterExclusions(client, LOGCOUNTERS_SUBFORM[0].SELLBALANCE);
        }
        let quantity = 0;
        if(PARTBALANCE_SUBFORM?.length > 0){
            for (const obj of PARTBALANCE_SUBFORM) {
                if (
                    client.priority.usingWARHSNAME.includes(obj.WARHSNAME.toString().toUpperCase())
                ) {
                    if (client.nickname === 'rGallery Priority' && obj.LOCNAME === 'R') { continue; }
                    quantity += obj.TBALANCE;
                }
            }
        }
        if (client.priority.isRemovingOrdersFromQty && LOGCOUNTERS_SUBFORM?.[0]?.ORDERS) {
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

