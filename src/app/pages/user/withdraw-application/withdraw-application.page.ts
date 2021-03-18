import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-withdraw-application',
  templateUrl: './withdraw-application.page.html',
  styleUrls: ['./withdraw-application.page.scss'],
})
export class WithdrawApplicationPage implements OnInit {

  public withdrawTypeRender: any[] = [
    {
      renderCheck: [{label: '我希望优先转到银行卡', isCheck: true}],
      label: '银行账号：136 6546 6616'
    },
    {
      renderCheck: [{label: '我希望优先转到支付宝', isCheck: false}],
      label: '支付宝账号：136 6546 6616'
    },
    {
      renderCheck: [{label: '我希望优先转到微信', isCheck: false}],
      label: '微信账号：136 6546 6616'
    },
    {
      renderCheck: [{label: '其他', isCheck: false}],
      label: '其他账号：136 6546 6616'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
