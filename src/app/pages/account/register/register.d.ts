interface RegisterForm {
  accountType: 1|2|3;
  credential?: string;
  identifier?: string;
  nickname: string;
  qq?: string;
  recommendCode?: string;
  smsCode: string;
  wechat?: string;
  [x: string]: any;
}
