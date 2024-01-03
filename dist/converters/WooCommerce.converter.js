"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooCommerceConverter = void 0;
const types_1 = require("../types");
class WooCommerceConverter {
    static convertProductToSyncaFormat(product, client) {
        var _a;
        const temp = {
            sellPrice: Number(product.regular_price),
            images: product.images.map(i => i.src),
            thirdPartyIds: new Map(),
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
        temp.thirdPartyIds.set(client._id, product.id.toString());
        return temp;
    }
    static convertProductToWooCommerceFormat(product, client, isExisting = false) {
        var _a, _b;
        const id = Number(product.thirdPartyIds.get(client._id));
        const temp = {
            id: isNaN(id) ? undefined : id,
            sku: product.sellBarcode,
            status: "publish",
            catalog_visibility: "visible",
            description: product.description,
            stock_status: product.hasQty ? 'instock' : 'outofstock',
            regular_price: product.sellPrice.toString(),
            name: product.name,
            manage_stock: false,
            images: (_a = product.images) === null || _a === void 0 ? void 0 : _a.map(imgSrc => ({ src: imgSrc, name: product.name, alt: product.name })),
        };
        if (!isExisting) {
            temp.name = `${temp.name} (חדש) `;
            if (client.isTempCategory) {
                temp.categories = [{ name: client.tempCategory }];
            }
        }
        if (client.wooCommerce.isUsingManagedStock) {
            temp.manage_stock = true;
            temp.stock_quantity =
                typeof product.qty === 'number' ?
                    product.qty :
                    product.hasQty ? 999 : 0;
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