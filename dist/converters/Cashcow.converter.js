"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashcowConverter = void 0;
class CashcowConverter {
    static convertProductToCashcowFormat(product, client, isExisting = false) {
        var _a, _b;
        const temp = {
            token: client.cashcow.token,
            store_id: client.cashcow.store_id,
            is_override_existing_product: true,
            is_restore_deleted_items: true,
            sku: product.sellBarcode,
            prices: {
                retail_price: product.sellPrice,
                sell_price: product.discountPrice,
                cost_price: product.costPrice,
            },
            title: product.name,
            main_category_name: product.category,
            images: {
                main_image_url: product.compressedImageUrl || product.mainImage
            },
            qty: product.qty,
            is_visible: product.isApprovedForWeb && product.qty > 0 && product.sellPrice > 0
        };
        if (!((_a = temp.images) === null || _a === void 0 ? void 0 : _a.main_image_url)) {
            delete temp.images;
        }
        if (!isExisting && client.isTempCategory) {
            temp.main_category_name = client.tempCategory;
        }
        if (isExisting) {
            (_b = client.cashcow
                .keysToIgnoreInExistingProduct) === null || _b === void 0 ? void 0 : _b.forEach(key => delete temp[key]);
        }
        return temp;
    }
}
exports.CashcowConverter = CashcowConverter;
//# sourceMappingURL=Cashcow.converter.js.map