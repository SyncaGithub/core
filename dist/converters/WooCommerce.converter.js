"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooCommerceConverter = void 0;
class WooCommerceConverter {
    static convertProductToWooCommerceFormat(product, client, isExisting = false) {
        var _a;
        const temp = {
            sku: product.sellBarcode,
            status: "publish",
            catalog_visibility: "visible",
            description: product.description,
            stock_status: product.qty > 0 ? 'instock' : 'outofstock',
            regular_price: product.sellPrice.toString(),
            name: product.name,
            images: product.images.map(imgSrc => ({ src: imgSrc, name: product.name, alt: product.name })),
        };
        if (!isExisting && client.isTempCategory) {
            temp.categories = [{ name: client.tempCategory }];
        }
        if (isExisting) {
            (_a = client.cashcow
                .keysToIgnoreInExistingProduct) === null || _a === void 0 ? void 0 : _a.forEach(key => delete temp[key]);
        }
        return temp;
    }
}
exports.WooCommerceConverter = WooCommerceConverter;
//# sourceMappingURL=WooCommerce.converter.js.map