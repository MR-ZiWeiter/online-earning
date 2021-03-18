import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public menuRenderConfig: any[] = [
    [
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-01@2x.svg', label: '资料认证', id: 0, url: '/pages/user/data-authentication', event: '' },
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-02@2x.svg', label: '提现申请', id: 0, url: '/pages/user/withdraw-application', event: '' },
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-03@2x.svg', label: '提现记录', id: 0, url: '/pages/user/withdrawals-record', event: '' },
    ],
    [
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-04@2x.svg', label: '资金明细', id: 0, url: '/pages/user/funding-details', event: '' },
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-05@2x.svg', label: '消息列表', id: 0, url: '/pages/user/messages', event: '' },
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-06@2x.svg', label: '修改密码', id: 0, url: '/pages/user/change-pwd', event: '' },
    ],
    [
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-07@2x.svg', label: '最新公告', id: 0, url: '/pages/user/latest-announcement', event: '' },
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-08@2x.svg', label: '联系客服', id: 0, url: '/pages/user/contact-customer-service', event: '' },
      { icon: '/assets/svgs/pages/user/swipe-pages-user-icon-09@2x.svg', label: '检查更新（1.0.0.8）', id: 0, url: '', event: '' },
    ]
  ];

  constructor() { }

  ngOnInit() {
  }

}
