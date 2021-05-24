import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paytype'
})
export class PaytypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    switch(value) {
      case 'alipay':
        return '支付宝'
      case 'wechat_pay':
        return '微信'
      case 'bank_card':
        return '银行卡'
    }
  }

}
