export interface IPriorityFilters {
    key: string;
    value: string;
    operator: string;
}
export interface IPriorityResult<T = any> {
    "@odata.context": string;
    value: T;
}
export interface IRawPriorityProduct {
    PARTNAME: string;
    BARCODE: string;
    PARTDES: string;
    ITAI_WS_NAME?: string;
    ITAI_WS_PART?: string;
    ITAI_WS_DES?: string;
    ITAI_WINSTORE?: string;
    ITAI_WS_TAGS?: string;
    STATDES: string;
    FAMILYDES: string;
    FAMILYNAME: string;
    FTCODE: string;
    FTNAME: string;
    SOF_DISPLAY: "Y" | null;
    SPEC2: string;
    SPEC15: string | null;
    EXTFILENAME?: string;
    PRIO_PICTUREPATH?: string;
    PARTPACK_SUBFORM: IPriority_PARTPACK_SUBFORM[];
    PARTINCUSTPLISTS_SUBFORM: IPriority_PARTINCUSTPLISTS_SUBFORM[];
    PARTBALANCE_SUBFORM: IPriority_PARTBALANCE_SUBFORM[];
    LOGCOUNTERS_SUBFORM: IPriority_LOGCOUNTERS_SUBFORM[];
    OPENPARTORDERS_SUBFORM: IPriority_OPENPARTORDERS_SUBFORM[];
}
export interface IPriority_PARTPACK_SUBFORM {
    PACKCODE?: string;
    PACKNAME: string;
    PACKQUANT: number;
    BARCODE?: string;
    FWIN_SELECTED?: 'Y' | null;
    PACK?: number;
}
export interface IPriority_PARTBALANCE_SUBFORM {
    TBALANCE: number;
    WARHSNAME: string;
    LOCNAME?: string | "0";
    VELOCITY?: number;
    TYPE?: string | "D";
    STZONECODE?: null;
    TUNITNAME?: string;
    SERIALNAME?: string | "0";
    SERIALDES?: string;
    EXPIRYDATE?: string;
    DOCNO?: null;
    PROJDES?: string;
    SUPNAME?: string;
    SUPDES?: string;
    CUSTNAME?: string;
    ACTNAME?: null;
    BALANCE?: number;
    UNITNAME?: string;
    LASTDATE?: string;
    NUMPACK?: number;
    ACT?: number;
    CUST?: number;
    SERIAL?: number;
    WARHS?: number;
}
export interface IPriority_OPENPARTORDERS_SUBFORM {
    TBALANCE: number;
}
export interface IPriority_PARTINCUSTPLISTS_SUBFORM {
    VATPRICE: number;
    PLNAME?: string;
    PRICE?: number;
    PLDES?: string;
    STATDES?: string;
    PERCENT?: number;
    DPRICE?: number;
    DVATPRICE?: number;
    CODE?: string | "$";
    PURTAXPERCENT?: number;
    BASEPRICE?: number;
    QUANT?: number;
    UNITNAME?: string;
    USERLOGIN?: string;
    UDATE?: string;
    PLDATE?: string;
    PLIST?: number;
    ITAI_PRICE?: number;
    ITAI_PRICETAX?: number;
    ITAI_PERCENT?: number;
    ITAI_PERCENTSALE?: number;
}
export interface IPriority_LOGCOUNTERS_SUBFORM {
    BALANCE: number;
    PORDERS: number;
    ORDERS: number;
    DIFF: number;
    SELLBALANCE: number;
    UNITNAME4: string;
    DUMMY: number;
    PDEALS?: number;
    DEALS?: number;
    DOCQ?: number;
}
export interface IPriority_New_Order_Response {
    "@odata.context": string;
    CUSTNAME: string;
    CDES: string;
    NAME: null;
    POSITIONDES: null;
    CURDATE: string;
    ORDNAME: string;
    BOOKNUM: null;
    DOCNO: null;
    PROJDES: null;
    ORDSTATUSDES: string;
    BOOLCLOSED: null;
    BOOLPCLOSED: null;
    FORECASTFLAG: null;
    CPROFNUM: null;
    PLNAME: null;
    DEALNAME: null;
    YOURDEALNAME: null;
    DETAILS: null;
    STATUSDATE: string;
    RMADOCNUM: null;
    DUEDATE: null;
    AGENTCODE: string;
    AGENTNAME: string;
    BRANCHNAME: null;
    DCODE: null;
    CODEDES: null;
    STCODE: null;
    STDES: null;
    TYPECODE: string;
    TYPEDES: string;
    REFERENCE: null;
    MODELNAME: null;
    QUANT: number;
    QPRICE: number;
    PERCENT: number;
    DISPRICE: number;
    VAT: number;
    TAXCODE: string;
    TOTPRICE: number;
    CODE: string;
    TOTPURCHASEPRICE: number;
    QPROFIT: number;
    PROFITPERCENT: number;
    LCODE: null;
    LEXCH: number;
    LEXCHTOL: number;
    LEXCHNEG: null;
    ADJPRICEFLAG: string;
    ADJPRICEDES: string;
    LINKOPTIONS: null;
    PAYCODE: null;
    PAYDES: null;
    OBFLAG: string;
    ADVBAL: number;
    ADVPERCENT: number;
    ORDREFA: null;
    DOERNAME: string;
    DOERNAME2: null;
    DOERNAME3: null;
    SDATE: null;
    DAY: null;
    STIME: string;
    EDATE: null;
    EDAY: null;
    ETIME: string;
    WARHSNAME: null;
    LOCNAME: null;
    WARHSDES: null;
    TOWARHSNAME: null;
    TOLOCNAME: null;
    TOWARHSDES: null;
    OPENDCH: null;
    EXTFILEFLAG: null;
    BONUSFLAG: null;
    CCNUM: null;
    TERRITORYCODE: null;
    TERRITORYDES: null;
    TOTQUANT: number;
    PIKALONEFLAG: null;
    STZONECODE: null;
    DISTRLINECODE: null;
    DISTRLINEDES: null;
    STZONEDES: null;
    WTASKDOCCODE: null;
    WTASKDOCDES: null;
    IVDCODE: null;
    IVDCODEDES: null;
    LFROMDATE: null;
    LBASEDATE: null;
    LPERCENT: number;
    SHIPREMARK: null;
    GPSX: null;
    GPSY: null;
    PIKORDER: number;
    INCPARTEXT: null;
    ORDCONTCHARGE: null;
    CHARGEPERIOD: number;
    CONTPAYNAME: null;
    CURVERSION: number;
    SUBSCRIBEFLAG: null;
    CALCVATFLAG: null;
    Y_3196_5_ESHB: string;
    Y_4624_5_ESHB: number;
    Y_12248_5_ESHB: string;
    FOLLOWUPIV: number;
}
export interface IPrioritySendOrder {
    CUSTNAME: string;
    CDES: string;
    TYPECODE: string;
    TYPEDES: string;
    AGENTNAME: string;
    ORDERITEMS_SUBFORM: IPriority_ORDERITEMS_SUBFORM[];
    SHIPTO2_SUBFORM: IPriority_SHIPTO2_SUBFORM;
    DETAILS: string;
    PERCENT?: number;
}
export interface IPriority_SHIPTO2_SUBFORM {
    CUSTDES: string;
    PHONENUM: string;
    ADDRESS: string;
    ADDRESS2: string;
    ADDRESS3?: string;
    STATE: string;
    ZIP?: number;
    EMAIL?: string;
}
export interface IPriority_ORDERITEMS_SUBFORM {
    PARTNAME: string;
    TQUANT: number;
}
export interface IPrioritySendInvoice {
    ACCNAME: string;
    CASHNAME: string;
    TPAYMENT2_SUBFORM: IPriority_INVOICE_TPAYMENT2_SUBFORM[];
}
export interface IPriority_INVOICE_TPAYMENT2_SUBFORM {
    PAYMENTCODE: string;
    PAYACCOUNT: string;
    PAYDATE: string;
    QPRICE: number;
}
export interface IPriortiyRawProductToSystemProductMap {
}
export interface IPrioritySendInvoice {
    ACCNAME: string;
    CASHNAME: string;
    TPAYMENT2_SUBFORM: IPriority_INVOICE_TPAYMENT2_SUBFORM[];
}
export interface IPriority_New_Invoice_Response {
    "@odata.context": "https://rgallery.agascloud.co.il/odata/Priority/tabula.ini/a050520/$metadata#TINVOICES/$entity";
    ACCNAME: string;
    CDES: string;
    NAME: null;
    CASHNAME: string;
    IVDATE: string;
    IVNUM: string;
    FINAL: null;
    STATDES: string;
    OWNERLOGIN: string;
    QPRICE: number;
    DISCOUNT: number;
    DISPRICE: number;
    TOTPRICE: number;
    DIFF: number;
    BOOKNUM: null;
    ORDNAME: null;
    REFERENCE: null;
    TYPECODE: null;
    TYPEDES: null;
    PROJDOCNO: null;
    PROJDES: null;
    CASHPAYMENT: number;
    FNCITEMSFLAG: null;
    PROFORMAFLAG: null;
    AFTERWTAX: number;
    WTAX: number;
    WTAXPERCENT: number;
    CODE: string;
    DETAILS: null;
    PRINTEDBOOL: null;
    PAYDATE: string;
    AVRGDATE: null;
    ADJPRICEFLAG: null;
    AGENTCODE: string;
    AGENTNAME: string;
    FNCPATNAME: string;
    FNCNUM: null;
    STORNOFLAG: null;
    EMAIL: null;
    BRANCHNAME: null;
    CUSTNAME: string;
    CTYPECODE: null;
    CTYPENAME: null;
    EXTFILEFLAG: null;
    BILLINGUSERLOGIN: null;
    EDIFLAG: null;
    IVCODENAME: null;
    IVCODEDES: null;
    CASHEXCEPTFLAG: null;
    TYPEDBYLOGIN: null;
    TYPEDDATE: null;
    DEBIT: string;
    FOLLOWUPIV: number;
    IVTYPE: string;
}
