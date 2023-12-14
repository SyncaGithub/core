"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashcowConverter = void 0;
const types_1 = require("../types");
class CashcowConverter {
    static convertProductToCashcowFormat(product, client, isExisting = false) {
        var _a, _b, _c, _d;
        const temp = {
            token: client.cashcow.token,
            store_id: client.cashcow.store_id,
            is_override_existing_product: true,
            is_restore_deleted_items: true,
            sku: product.sellBarcode,
            prices: {
                retail_price: product.sellPrice,
                sell_price: (_a = product.discountPrice) !== null && _a !== void 0 ? _a : 0,
                cost_price: (_b = product.costPrice) !== null && _b !== void 0 ? _b : 0,
            },
            title: product.name,
            main_category_name: product.category,
            images: {
                main_image_url: product.compressedImageUrl || product.mainImage
            },
            qty: product.qty,
            is_visible: product.isActive && product.isApprovedForWeb && product.qty > 0 && product.sellPrice > 0
        };
        if (!((_c = temp.images) === null || _c === void 0 ? void 0 : _c.main_image_url)) {
            delete temp.images;
        }
        if (!isExisting && client.isTempCategory) {
            temp.main_category_name = client.tempCategory;
        }
        if (isExisting) {
            (_d = client.cashcow
                .keysToIgnoreInExistingProduct) === null || _d === void 0 ? void 0 : _d.forEach(key => delete temp[key]);
        }
        return temp;
    }
    static generateUpdateOrderObject(order, client) {
        return {
            token: client.cashcow.token,
            store_id: client.cashcow.store_id,
            order_id: order.Id,
            email_address: order.Email,
            order_status_type: types_1.ECashcowOrderStatus.Claimed
        };
    }
}
exports.CashcowConverter = CashcowConverter;
//# sourceMappingURL=Cashcow.converter.js.map