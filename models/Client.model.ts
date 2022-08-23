import { Schema } from 'mongoose';
import { EntityStatus, EClientType } from '../../../enums';
import { IClient, IClientModel } from '../../../interfaces';

export const ClientSchema = new Schema<IClient, IClientModel, IClientModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: EntityStatus, default: EntityStatus.READY },
    workWithClients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    clientType: { type: String, enum: EClientType, required: true },
    nickname: { type: String, required: true },
    barcodeTag: String,
    sellPriceMultiple: { type: Number, default: 1 },
    sellPriceFormula: String,
    lastUpdate: String,
    isTempCategory: { type: Boolean, default: false },
    tempCategory: { type: String, default: 'זמני' },
    priority: {
      username: String,
      password: String,
      baseUrl: String,
      agentName: String,
      paymentCode: String,
      cashNumber: String,
      customerNumber: String,
      productsEndPoint: String,
      invoiceEndPoint: String,
      ordersEndPoint: String,
      priceKey: String,
      getProductsFilters: [{ key: String, value: String, operator: String }],
      productMap: Schema.Types.Mixed,
      getProductsExpand: String,
      getProductsSelect: String,
    },
    cashcow: {
      token: String,
      store_id: Number,
    },
    isUsingWhiteList: { type: Boolean, default: false },
    whiteListProducts: [
      { type: Schema.Types.ObjectId, ref: 'Product', default: [] },
    ],
    isUsingBlackList: { type: Boolean, default: false },
    blackListProducts: [
      { type: Schema.Types.ObjectId, ref: 'Product', default: [] },
    ],
  },
  { timestamps: true, versionKey: false },
);

ClientSchema.pre<IClient>('save', async function (next) {
  if (!this.isNew) {
    return next();
  }
  try {
    // await isPriorityUserValid({ username: this.priority.username, password: this.priority.password, baseUrl: this.priority.baseUrl });
    return next();
  } catch (error) {
    return next(error);
  }
});

ClientSchema.methods.isClientBusy = async function (): Promise<boolean> {
  if (this.status === EntityStatus.WORKING) {
    return Promise.reject('Client is busy');
  } else {
    return Promise.resolve(false);
  }
};

const isPriorityUserValid = function ({ username, password, baseUrl }) {
  return new Promise((resolve, reject) => {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    fetch(encodeURI(`${baseUrl}`), {
      headers: { Authorization: `Basic ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          return reject('Bad Cradentials');
        }
        return resolve(true);
      })
      .catch((err) => reject(err));
  });
};
