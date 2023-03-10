"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityConverter = void 0;
const types_1 = require("../types");
class PriorityConverter {
    convertProductToSyncaFormat(rawProduct, client, lastUpdateISO) {
        const futureOrdersFromClient = this.getFutureOrders(rawProduct.LOGCOUNTERS_SUBFORM);
        const { category, subcategory } = this.getCategories(rawProduct, client);
        const { isDisplay, displayQty, containerQty } = this.getPackageData(rawProduct.PARTPACK_SUBFORM);
        const { costPrice, sellPrice, discountPrice } = this.getPrices(client, rawProduct.PARTINCUSTPLISTS_SUBFORM, client.priority.priceKey, isDisplay, displayQty);
        const name = this.getName(rawProduct, client);
        const description = this.getDescription(rawProduct, client);
        const sellBarcode = this.getSellBarcode(rawProduct, client);
        const qty = this.getQuantity(client, rawProduct.LOGCOUNTERS_SUBFORM, rawProduct.PARTBALANCE_SUBFORM);
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
            mainImage: this.getImageEndpoint(rawProduct[client.priority.productMap['mainImage']], client.priority.baseUrl),
            subCategory: subcategory,
            description,
            lastUpdate: lastUpdateISO
        };
    }
    getName(rawProduct, client) {
        let name = rawProduct.PARTDES || '';
        switch (client.nickname) {
            case 'win-priority':
                name = rawProduct.ITAI_WS_NAME || '';
                break;
            case 'telbar-priority':
                if (!name.includes('(') || !name.includes(')'))
                    return name;
                name =
                    name.substring(0, name.indexOf('(')) +
                        name.substring(name.indexOf(')') + 1).trim(); // telbar request for removing parenthesis
                break;
            default:
                name = rawProduct.PARTDES;
                break;
        }
        return name;
    }
    getDescription(rawProduct, client) {
        let description;
        switch (client.nickname) {
            case 'win-priority':
                description = rawProduct.ITAI_WS_DES;
                break;
            default:
                break;
        }
        return description;
    }
    getQuantity(client, LOGCOUNTERS_SUBFORM, PARTBALANCE_SUBFORM) {
        if (client.priority.isUsingSummaryPage &&
            LOGCOUNTERS_SUBFORM.length > 0) {
            return LOGCOUNTERS_SUBFORM[0].SELLBALANCE;
        }
        let quantity = 0;
        for (const obj of PARTBALANCE_SUBFORM) {
            if (client.priority.usingWARHSNAME.includes(obj.WARHSNAME.toString().toUpperCase())) {
                if (client.nickname === 'rGallery' && obj.LOCNAME === 'R') {
                    continue;
                }
                quantity += obj.TBALANCE;
            }
        }
        return quantity;
    }
    getCategories(rawProduct, client) {
        let category = '', subcategory = '';
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
    getFutureOrders(LOGCOUNTERS_SUBFORM) {
        if (LOGCOUNTERS_SUBFORM.length === 0)
            return;
        return LOGCOUNTERS_SUBFORM[0].PORDERS;
    }
    getSellBarcode(rawProduct, client) {
        let sellBarcode = '';
        switch (client.priority.sellBarcodeKey) {
            case types_1.EProductSellProperty.SKU:
                sellBarcode = client.barcodeTag
                    ? client.barcodeTag + rawProduct.PARTNAME
                    : rawProduct.PARTNAME;
                break;
            // case EProductSellProperty.BARCODE
            default:
                sellBarcode = client.barcodeTag
                    ? client.barcodeTag + rawProduct.BARCODE
                    : rawProduct.BARCODE;
                break;
        }
        return sellBarcode;
    }
    getPrices(client, PARTINCUSTPLISTS_SUBFORM, priceKey, isDisplay, displayQty) {
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
            default:
                costPrice = PARTINCUSTPLISTS_SUBFORM[0][priceKey];
                break;
        }
        if (costPrice !== undefined) {
            sellPrice = costPrice * client.sellPriceMultiple;
            // sellPrice = isDisplay && displayQty? sellPrice * displayQty : sellPrice;
            let temp = sellPrice.toFixed(2);
            sellPrice = Number(temp.substr(0, temp.length - 1) + '0');
        }
        return {
            costPrice,
            discountPrice,
            sellPrice
        };
    }
    getPackageData(PARTPACK_SUBFORM) {
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
    getImageEndpoint(filePath, baseUrl) {
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
            // Telbar images path
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
            baseUrl = baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.substr(0, baseUrl.indexOf('/odata'));
            return baseUrl + '/priimages/' + fileName;
        }
        baseUrl = baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.substr(0, baseUrl.indexOf('/odata'));
        const start = baseUrl + '/primail/';
        const result = start + filePath.substr(filePath.indexOf('mail/') + 5);
        return result;
    }
}
exports.PriorityConverter = PriorityConverter;
//# sourceMappingURL=Priority.converter.js.map