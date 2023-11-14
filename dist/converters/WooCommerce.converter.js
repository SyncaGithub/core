"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooCommerceConverter = void 0;
const types_1 = require("../types");
class WooCommerceConverter {
    static convertProductToSyncaFormat(product, client) {
        var _a;
        return {
            sellPrice: Number(product.regular_price),
            images: product.images.map(i => i.src),
            thirdPartyId: product.id.toString(),
            sellBarcode: product.sku,
            isApprovedForWeb: true,
            name: product.name,
            category: (_a = product.categories) === null || _a === void 0 ? void 0 : _a[0].name,
            description: product.description,
            qty: product.stock_quantity,
            clientType: types_1.EClientType.WOOCOMMERCE,
            user: client.user,
            client: client._id
        };
    }
    static convertProductToWooCommerceFormat(product, client, isExisting = false) {
        var _a, _b;
        const temp = {
            sku: product.sellBarcode,
            status: "publish",
            catalog_visibility: "visible",
            description: product.description,
            stock_status: product.hasQty ? 'instock' : 'outofstock',
            regular_price: product.sellPrice.toString(),
            name: product.name,
            images: (_a = product.images) === null || _a === void 0 ? void 0 : _a.map(imgSrc => ({ src: imgSrc, name: product.name, alt: product.name })),
        };
        if (!isExisting && client.isTempCategory) {
            temp.categories = [{ name: client.tempCategory }];
        }
        if (isExisting) {
            (_b = client.wooCommerce
                .keysToIgnoreInExistingProduct) === null || _b === void 0 ? void 0 : _b.forEach(key => delete temp[key]);
        }
        return temp;
    }
}
exports.WooCommerceConverter = WooCommerceConverter;
//# sourceMappingURL=WooCommerce.converter.js.map