export interface IWooCommerce_Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string;
    date_on_sale_from_gmt: string;
    date_on_sale_to: string;
    date_on_sale_to_gmt: string;
    price_html: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: IWooCommerce_Download[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    sold_individually: boolean;
    weight: string;
    dimensions: IWooCommerce_ProductDimensions;
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: IWooCommerce_ProductCategory[];
    tags: IWooCommerce_ProductTag[];
    images: IWooCommerce_ProductImage[];
    attributes: IWooCommerce_ProductAttribute[];
    default_attributes: IWooCommerce_ProductDefaultAttribute[];
    variations: number[];
    grouped_products: number[];
    menu_order: number;
    meta_data: IWooCommerce_ProductMetaData[];
}

export interface IWooCommerce_Download {
    id: string;
    name: string;
    file: string;
}

export interface IWooCommerce_ProductDimensions {
    length: string;
    width: string;
    height: string;
}

export interface IWooCommerce_ProductCategory {
    id?: number;
    name: string;
    slug?: string;
}

export interface IWooCommerce_ProductTag {
    id: number;
    name: string;
    slug: string;
}

export interface IWooCommerce_ProductImage {
    id?: number;
    date_created?: string;
    date_created_gmt?: string;
    date_modified?: string;
    date_modified_gmt?: string;
    src: string;
    name: string;
    alt: string;
}

export interface IWooCommerce_ProductAttribute {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

export interface IWooCommerce_ProductDefaultAttribute {
    id: number;
    name: string;
    option: string;
}

export interface IWooCommerce_ProductMetaData {
    id: number;
    key: string;
    value: string;
}

export interface IWooCommerce_ProductBatchAction{
    create: Partial<IWooCommerce_Product>[];
    update: Partial<IWooCommerce_Product>[];
    delete: number[];
}

export interface IWooCommerce_ProductBatchActionResponse{
    create: Partial<IWooCommerce_Product>[];
    update: Partial<IWooCommerce_Product>[];
    delete: Partial<IWooCommerce_Product>[];
}