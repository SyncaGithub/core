"use strict";
// "convert-excel-to-json": "^1.7.0", (--save)
// "@types/convert-excel-to-json": "^1.7.1" (dev dependenciees --save-dev)
// import excelToJson from 'convert-excel-to-json';
// const cashcowSheetName = 'CSV_Import_Template';
// const cashcowSheetFirstRowOfData = 8;
// const fileForTests = `${__dirname}/../../17464_03112023-10-30_2d510e4d-1f76-491c-901f-b05c808730d3.xlsx`;
// const CashcowExcelColumnToHeader: {[key: string]: keyof CashcowExcelFormat} = {
//     'A':'sku',
//     'B':'title',
//     'C':'Permalink_url',
//     'D':'category',
//     'E':'retail_price',
//     'F':'sell_price',
//     'G':'shipping_price',
//     'H':'like_price',
//     'I':'share_price',
//     'J':'seo_title',
//     'K':'short_description',
//     'L':'seo_keywords', //words seperated with comma
//     'M':'product_short_description',
//     'N':'long_description',
//     'O':'stock',
//     'P':'weight',
//     'Q':'image_url',
//     'R':'image_url_1',
//     'S':'image_url_2',
//     'T':'image_url_3',
//     'U':'youtube_url',
//     'V':'is_visible',
//     'W':'more_categories', //words seperated with comma
//     'X':'language', //for now always 'Hebrew'
//     'Y':'cost_price',
//     'Z':'is_support_shipping',
//     'AA':'tags', //words seperated with comma
//     'AB':'qty_type',
// }
// const result = excelToJson({
//     sourceFile: fileForTests,
//     header:{
//         // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
//         rows: cashcowSheetFirstRowOfData // 2, 3, 4, etc.
//     },
//     columnToKey: CashcowExcelColumnToHeader
// });
// const data: CashcowExcelFormat[] = result[cashcowSheetName];
// console.log(data);
// export interface CashcowExcelFormat {
//     sku: string;
//     title: string;
//     Permalink_url: string;
//     category: string;
//     retail_price: number;
//     sell_price: number;
//     shipping_price: number;
//     like_price?: number;
//     share_price?: number;
//     seo_title?: string;
//     short_description?: string;
//     seo_keywords?: string; //words seperated with comma
//     product_short_description?: string;
//     long_description?: string;
//     stock: number;
//     weight?: number | string;
//     image_url?: string;
//     image_url_1?: string;
//     image_url_2?: string;
//     image_url_3?: string;
//     youtube_url?: string;
//     is_visible: 'True' | 'False';
//     more_categories?: string; //words seperated with comma
//     language: string; //for now always 'Hebrew'
//     cost_price?: number;
//     is_support_shipping: 'True' | 'False';
//     tags?: string; //words seperated with comma
//     qty_type: number;
// }
//# sourceMappingURL=excel.util.js.map