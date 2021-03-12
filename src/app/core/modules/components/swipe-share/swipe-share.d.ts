interface ApiConfig {
  appId: string;
  nonceStr: string;
  signature: string;
  timestamp: number;
  url: string;
  [propsName: string]: any;
}

interface ShareConfig {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
  type?: string;
  dataUrl?: string;
  [propsName: string]: any;
}