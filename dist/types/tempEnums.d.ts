export declare enum EntityStatus {
    WORKING = "WORKING",
    CRASHED = "CRASHED",
    READY = "READY"
}
export declare enum EActionStatus {
    FAILED = "FAILED",
    SUCCESS = "SUCCESS"
}
export declare enum EJobStatus {
    RUNNING = "RUNNING",
    STOPED = "STOPED"
}
export declare enum EActionType {
    PRIORITY_SEND_ORDER = "PRIORITY_SEND_ORDER",
    PRIORITY_SEND_INVOICE = "PRIORITY_SEND_INVOICE",
    PRIORITY_FETCH_PRODUCTS = "PRIORITY_FETCH_PRODUCTS",
    PRIORITY_LOAD_EXCEL = "PRIORITY_LOAD_EXCEL",
    CASHCOW_FETCH_ORDER = "CASHCOW_FETCH_ORDER",
    CASHCOW_FETCH_TOTALORDER = "CASHCOW_FETCH_TOTALORDER",
    CASHCOW_SEND_PRODUCTS = "CASHCOW_SEND_PRODUCTS",
    CASHCOW_LOAD_EXCEL = "CASHCOW_LOAD_EXCEL",
    IMAGE_COMPRESSION = "IMAGE_COMPRESSION"
}
export declare enum EClientType {
    PRIORITY = "PRIORITY",
    CASHCOW = "CASHCOW"
}
export declare enum EQtyType {
    UNIT = "UNIT",
    BOX = "BOX"
}
export declare enum ECashcowOrderStatus {
    PhoneBankTransfer = 1,
    Lead = 2,
    Paid = 4,
    Error = 5,
    Delivered = 6,
    PendingReview = 7,
    Cancaled = 8,
    Claimed = 9
}
//# sourceMappingURL=tempEnums.d.ts.map