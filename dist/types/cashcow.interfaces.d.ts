import { ECashcowOrderStatus, ECashcowAddOrUpdateQtyType } from "./cashcow.enums";
export interface ICashcowUpdateOrderRequest {
    token: string;
    store_id: number;
    order_id: number;
    email_address: number | string;
    order_status_type: ECashcowOrderStatus;
}
export interface ICashcowAddOrUpdateObject {
    token: string;
    store_id: number;
    sku: string;
    is_override_existing_product: boolean;
    is_restore_deleted_items: boolean;
    is_force_delete_existing_attributes?: boolean;
    is_visible: boolean;
    title?: string;
    main_category_name?: string;
    short_description?: string;
    long_description?: string;
    qty?: number;
    qty_type?: ECashcowAddOrUpdateQtyType;
    qty_jumping_number?: number;
    weight?: number;
    is_no_vat?: boolean;
    images?: {
        main_image_url: string;
    };
    prices?: {
        retail_price?: number;
        sell_price?: number;
        cost_price?: number;
    };
    attributes?: {
        name?: string;
        friendly_name?: string;
        internal_identifier?: string;
        attribute_type?: number;
        is_required?: boolean;
        options?: {
            name?: string;
            sku?: string;
            qty?: number;
            external_price?: number;
            cost_price?: number;
        };
    };
    attributes_matrix?: {
        attribute_a_internal_identifier: string;
        attribute_b_internal_identifier: string;
        matrix_options: {
            to_option_a_text: string;
            to_option_b_text: string;
            qty: number;
            sku_for_matrix: string;
        };
    };
    is_hide_buy_buttons?: boolean;
}
export interface ICashcowOrdersResponse {
    token: string;
    store_id: number;
    response_time: string;
    state_id: 0;
    page: number;
    page_size: number;
    total_records: number;
    result: ICashcowOrder[];
}
export interface ICashcowOrder {
    Id: number;
    ShipingType: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Address: string;
    City: string;
    FloorNumber: string;
    StreetNameAndNumber: string;
    ApartmentNumber: string;
    ZipCode: string;
    OrderStatus: number;
    OrderDate: string;
    ShipingPrice: number;
    TotalPrice: number;
    IsSelfDelivery: boolean;
    IsAccountReadThisOrder: boolean;
    PaymentOptionType: number;
    TotalProducts: number;
    CuponId: number;
    FullResponse: string;
    TransactionId: string;
    LastDigits: string;
    OrderShippingId?: number;
    ShippingTypeIcon?: string;
    ShippingTypeName?: string;
    OrderShippingStateId?: number;
    InvoiceUrl?: string;
    CopyInvoiceUrl?: string;
    InvoiceNumber?: string;
    CuponValue?: string;
    DiscountId: number;
    DiscountPrice: number;
    IsCreditClaimed: false;
    CreditsClaimed: number;
    ExtraField1: string;
    ExtraField2: string;
    ExtraField3: string;
    ExtraField4: string;
    ExtraField5: string;
    ExtraField6: string;
    BranchID: number;
    FeePrice: number;
    CustomerInstructions: string;
    Products: ICashcowOrderProduct[];
}
export interface ICashcowOrderProduct {
    customer_product_id: number;
    Id: number;
    Total: number;
    Qty: number;
    Name: string;
    Attributes: null;
    Order_Code: string;
    discount_id: number;
    discount_price: number;
    price_before_discount: number;
    cost_price: number;
    sku: string;
}
export interface ICashcowProductAddOrUpdateResponse {
    id: number;
    is_existing_updated: boolean;
    success: boolean;
    error: string;
}
export interface ICashcowOrderUpdateResponse {
    id: number;
    is_updated: boolean;
    is_order_status_changed: boolean;
    token: string;
    response_time: string;
    state_id: number;
}
export interface IConvertToApiObjectParams {
    token: string;
    store_id: number;
}
