import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CoreToolsFunction } from 'src/app/core/core.tools';

import wx from 'weixin-js-sdk';
import { ApiSystemService } from '../../provider/api';

@Component({
  selector: 'swipe-share',
  templateUrl: './swipe-share.component.html',
  styleUrls: ['./swipe-share.component.scss']
})
export class SwipeShareComponent extends CoreToolsFunction implements OnInit {

  public shareConfig = [
    // {
    //   id: 1,
    //   icon: '/assets/svgs/components/share/cnet_component_share_01@2x.svg',
    //   label: '微信'
    // },
    // {
    //   id: 2,
    //   icon: '/assets/svgs/components/share/cnet_component_share_02@2x.svg',
    //   label: '朋友圈'
    // },
    {
      id: 3,
      icon: '/assets/svgs/components/share/cnet_component_share_03@2x.svg',
      label: 'QQ'
    },
    {
      id: 4,
      icon: '/assets/svgs/components/share/cnet_component_share_04@2x.svg',
      label: 'QQ空间'
    }
  ];

  @Input() private conifg: ShareConfig;

  public type = 'weixin';

  constructor(
    private modalController: ModalController,
    private apiSystemService: ApiSystemService,
    private toastController: ToastController
  ) {
    super();
  }

  ngOnInit() {
    if (this.isWeiXin()) {
      this.type = 'weixin';
      this.fetchWxJSSDKInfo();
    } else {
      this.type = 'browser';
    }
  }
  // 获取微信JSSDK
  private fetchWxJSSDKInfo(): void {
    this.apiSystemService.asyncFetchSystemWxJSSDK().subscribe(info => {
      // console.log(info.rel);
      this.initWxConfig(info.rel);
    });
  }
  // 初始化微信SDK接口
  private initWxConfig(info: ApiConfig): void {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: info.appId, // 必填，公众号的唯一标识
      timestamp: info.timestamp, // 必填，生成签名的时间戳
      nonceStr: info.nonceStr, // 必填，生成签名的随机串
      signature: info.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareQZone', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    // 配置微信分享
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: this.conifg.title, // 分享标题
        desc: this.conifg.desc, // 分享描述
        link: this.conifg.link || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: this.conifg.imgUrl, // 分享图标
        type: this.conifg.type || 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: this.conifg.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 用户确认分享后执行的回调函数
          this.presentToast('分享成功!', 'success');
          this.dismiss();
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
          this.presentToast('分享失败!', 'light');
        }
      });
      wx.onMenuShareTimeline({
        title: this.conifg.title, // 分享标题
        desc: this.conifg.desc, // 分享描述
        link: this.conifg.link || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: this.conifg.imgUrl, // 分享图标
        type: this.conifg.type || 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: this.conifg.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 用户确认分享后执行的回调函数
          this.presentToast('分享成功!', 'success');
          this.dismiss();
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
          this.presentToast('分享失败!', 'light');
        }
      });
      wx.onMenuShareQQ({
        title: this.conifg.title, // 分享标题
        desc: this.conifg.desc, // 分享描述
        link: this.conifg.link || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: this.conifg.imgUrl, // 分享图标
        type: this.conifg.type || 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: this.conifg.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 用户确认分享后执行的回调函数
          this.presentToast('分享成功!', 'success');
          this.dismiss();
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
          this.presentToast('分享失败!', 'light');
        }
      });
      wx.onMenuShareQZone({
        title: this.conifg.title, // 分享标题
        desc: this.conifg.desc, // 分享描述
        link: this.conifg.link || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: this.conifg.imgUrl, // 分享图标
        type: this.conifg.type || 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: this.conifg.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 用户确认分享后执行的回调函数
          this.presentToast('分享成功!', 'success');
          this.dismiss();
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
          this.presentToast('分享失败!', 'light');
        }
      });
    });
  }

  public openShareEvent(info: any) {
    switch (info.id) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
    }
    this.openBorwser(info.id);
  }

  private openBorwser(type: number) {
    const alink = document.createElement('a');
    alink.target = '_blank';
    switch (type) {
      case 1:
        alink.href = ``;
        break;
      case 2:
        alink.href = ``;
        break;
      case 3:
        alink.href = `http://connect.qq.com/widget/shareqq/index.html?
        url=${encodeURIComponent(this.conifg.link)}&title=${this.conifg.title}&
        source=${this.conifg.souces}&desc=${this.conifg.desc}&
        pics=${encodeURIComponent(this.conifg.imgUrl)}&summary=${this.conifg.dataUrl}`;
        break;
      case 4:
        alink.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?
        url=${encodeURIComponent(this.conifg.link)}&title=${this.conifg.title}&
        site=${this.conifg.souces}&desc=${this.conifg.desc}&
        pics=${encodeURIComponent(this.conifg.imgUrl)}&summary=${this.conifg.dataUrl}`;
        break;
    }
    alink.click();
    console.log(alink);
  }

  // 提示吐司
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      color,
      message,
      duration: 2000
    });
    toast.present();
  }

  public dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
