export interface IApiBusinessInfoModel {
  account: string;
  avatar: string;
  buyerAccountTags: {[label: string]: any};
  id: number;
  nickname: string;
  platformId: number;
  reputationLevel: number;
  seller: number;
  [x: string]: any;
}

export interface IApiBusinessSaloonInfoModel {
  award: number;
  createTime: string;
  id: number;
  image: string;
  platformTitle: string;
  shopTitle: string;
  status: number;
  taskCode: string;
  taskOriginalId: number;
  title: string;
  unitPrice: number;
  [x: string]: any;
}
