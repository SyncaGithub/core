"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityConverter = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
class PriorityConverter {
    static productWithSubBarcodesToProducts(rawProduct) {
        return rawProduct
            .ITAI_WS_TAGS
            .split(';')
            .map(subBarcodePostfix => (Object.assign(Object.assign({}, rawProduct), { PARTNAME: `${rawProduct.PARTNAME}${PriorityConverter.PARTNAMESeparator}${subBarcodePostfix}`, BARCODE: `${rawProduct.BARCODE}${PriorityConverter.BarcodeSeparator}${subBarcodePostfix}` })));
    }
    static convertProductToSyncaFormat(rawProduct, client, lastUpdateISO) {
        const futureOrdersFromClient = PriorityConverter.getFutureOrders(rawProduct.LOGCOUNTERS_SUBFORM);
        const { category, subcategory } = PriorityConverter.getCategories(rawProduct, client);
        const { isDisplay, displayQty, containerQty } = PriorityConverter.getPackageData(rawProduct.PARTPACK_SUBFORM);
        const { costPrice, sellPrice, discountPrice } = PriorityConverter.getPrices(client, rawProduct.PARTINCUSTPLISTS_SUBFORM, client.priority.priceKey, isDisplay, displayQty);
        const name = PriorityConverter.getName(rawProduct, client);
        const description = PriorityConverter.getDescription(rawProduct, client);
        const sellBarcode = PriorityConverter.getSellBarcode(rawProduct, client);
        const qty = PriorityConverter.getQuantity(client, rawProduct.LOGCOUNTERS_SUBFORM, rawProduct.PARTBALANCE_SUBFORM);
        const mainImage = PriorityConverter.getImageEndpoint(rawProduct[client.priority.productMap.mainImage[0]], client.priority.baseUrl);
        const isApprovedForWeb = PriorityConverter.getIsApprovedForWeb(rawProduct, client);
        return {
            user: client.user,
            clientType: types_1.EClientType.PRIORITY,
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
    static getIsApprovedForWeb(rawProduct, client) {
        var _a;
        return !((_a = client.priority.productsBadStatuses) !== null && _a !== void 0 ? _a : []).includes(rawProduct.STATDES);
    }
    static getName(rawProduct, client) {
        var _a;
        let name = (0, utils_1.get)(rawProduct, Array.from((_a = client.priority.productMap.name) !== null && _a !== void 0 ? _a : []), '');
        if (client.nickname === 'telbar-priority' && name.includes('(') && name.includes(')')) {
            name =
                name.substring(0, name.indexOf('(')) +
                    name.substring(name.indexOf(')') + 1).trim();
        }
        return name;
    }
    static getDescription(rawProduct, client) {
        let description = undefined;
        switch (client.nickname) {
            case 'win-priority':
                description = rawProduct.ITAI_WS_DES;
                break;
            default:
                break;
        }
        return description;
    }
    static getQuantity(client, LOGCOUNTERS_SUBFORM, PARTBALANCE_SUBFORM) {
        var _a;
        if (client.priority.isUsingSummaryPage &&
            (LOGCOUNTERS_SUBFORM === null || LOGCOUNTERS_SUBFORM === void 0 ? void 0 : LOGCOUNTERS_SUBFORM.length) > 0) {
            return PriorityConverter.getQuantityAfterExclusions(client, LOGCOUNTERS_SUBFORM[0].SELLBALANCE);
        }
        let quantity = 0;
        if ((PARTBALANCE_SUBFORM === null || PARTBALANCE_SUBFORM === void 0 ? void 0 : PARTBALANCE_SUBFORM.length) > 0) {
            for (const obj of PARTBALANCE_SUBFORM) {
                if (client.priority.usingWARHSNAME.includes(obj.WARHSNAME.toString().toUpperCase())) {
                    if (client.nickname === 'rGallery Priority' && obj.LOCNAME === 'R') {
                        continue;
                    }
                    quantity += obj.TBALANCE;
                }
            }
        }
        if (client.priority.isRemovingOrdersFromQty && ((_a = LOGCOUNTERS_SUBFORM === null || LOGCOUNTERS_SUBFORM === void 0 ? void 0 : LOGCOUNTERS_SUBFORM[0]) === null || _a === void 0 ? void 0 : _a.ORDERS)) {
            quantity -= LOGCOUNTERS_SUBFORM[0].ORDERS;
        }
        return PriorityConverter.getQuantityAfterExclusions(client, quantity);
    }
    static getQuantityAfterExclusions(client, qty) {
        if (!client.priority.minQty)
            return qty;
        return qty <= client.priority.minQty ? 0 : qty;
    }
    static getCategories(rawProduct, client) {
        let category = '', subcategory = '';
        switch (client.nickname) {
            case 'telbar-priority':
                category =
                    rawProduct.SPEC2 || rawProduct.FTNAME || rawProduct.FAMILYDES;
                break;
            default:
                category = rawProduct.FAMILYDES;
                break;
        }
        return { category, subcategory };
    }
    static getFutureOrders(LOGCOUNTERS_SUBFORM) {
        var _a;
        if ((LOGCOUNTERS_SUBFORM === null || LOGCOUNTERS_SUBFORM === void 0 ? void 0 : LOGCOUNTERS_SUBFORM.length) === 0)
            return;
        return (_a = LOGCOUNTERS_SUBFORM === null || LOGCOUNTERS_SUBFORM === void 0 ? void 0 : LOGCOUNTERS_SUBFORM[0]) === null || _a === void 0 ? void 0 : _a.PORDERS;
    }
    static getSellBarcode(rawProduct, client) {
        let sellBarcode = '';
        switch (client.priority.sellBarcodeKey) {
            case types_1.EProductSellProperty.SKU:
                sellBarcode = client.barcodeTag
                    ? client.barcodeTag + rawProduct.PARTNAME
                    : rawProduct.PARTNAME;
                break;
            default:
                sellBarcode = client.barcodeTag
                    ? client.barcodeTag + rawProduct.BARCODE
                    : rawProduct.BARCODE;
                break;
        }
        return sellBarcode;
    }
    static getPrices(client, PARTINCUSTPLISTS_SUBFORM, priceKey, isDisplay, displayQty) {
        let costPrice;
        let sellPrice;
        let discountPrice;
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
            let temp = sellPrice.toFixed(2);
            sellPrice = Number(temp.substring(0, temp.length - 1) + '0');
        }
        return {
            costPrice,
            discountPrice,
            sellPrice
        };
    }
    static getPackageData(PARTPACK_SUBFORM) {
        var _a;
        if (!PARTPACK_SUBFORM)
            return { isDisplay: false };
        let isDisplay = false;
        let displayQty;
        let containerQty;
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
                (_a = PARTPACK_SUBFORM.find((val) => val.PACKNAME === 'מינימום להזמנה')) === null || _a === void 0 ? void 0 : _a.PACKQUANT;
        }
        return { isDisplay, displayQty, containerQty };
    }
    static getImageEndpoint(filePath, baseUrl) {
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
            const fileName = filePath.substring(4, filePath.indexOf('system/')) +
                filePath.substring(filePath.lastIndexOf('/') + 1) +
                '.jpg';
            filePath =
                '../../' +
                    filePath.substring(filePath.indexOf('system/'), filePath.lastIndexOf('/') + 1) +
                    fileName;
        }
        if (filePath.startsWith('../../system/images')) {
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
            baseUrl = baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.substring(0, baseUrl.indexOf('/odata'));
            return baseUrl + '/priimages/' + fileName;
        }
        baseUrl = baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.substring(0, baseUrl.indexOf('/odata'));
        const start = baseUrl + '/primail/';
        const result = start + filePath.substring(filePath.indexOf('mail/') + 5);
        return result;
    }
}
exports.PriorityConverter = PriorityConverter;
PriorityConverter.BarcodeSeparator = '-';
PriorityConverter.PARTNAMESeparator = '@';
//# sourceMappingURL=Priority.converter.js.map