import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiUserIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-withdraw-application',
  templateUrl: './withdraw-application.page.html',
  styleUrls: ['./withdraw-application.page.scss'],
})
export class WithdrawApplicationPage implements OnInit {

  public amountConfig: any = {
    amount: 0,
    payAccountId: 0,
    payAccountText: null
  };

  public amountInfo: any = {};

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

  constructor(
    private toastController: ToastController,
    private apiIndexUserService: ApiUserIndexService
  ) {
    this.fetchAmountInfo();
    this.fetchWithdrawInfo();
  }

  ngOnInit() {
  }

  /* 获取账户基本金额 */
  private fetchAmountInfo() {
    this.apiIndexUserService.asyncFetchUserHomeInfo().subscribe(res => {
      // console.log(res);
      this.amountInfo = res.rel;
    })
  }
  /* 获取提现方式 */
  private fetchWithdrawInfo() {
    this.apiIndexUserService.asyncFetchWithdrawInfo().subscribe(res => {
      // console.log(res)
      this.withdrawTypeRender = res.rel.map(item => {
        return {
          renderCheck: [{label: `我希望优先转到${item.payType}`, isCheck: false}],
          label: `${item.payType}账号: ${item.account}`,
          ...item
        }
      })
    })

  }

  /* 选择提款方式 */
  public checkedChange(info: any, infos: any) {
    console.log(infos)
    if (info[0].isCheck) {
      this.amountConfig.payAccountId = infos.id;
      this.amountConfig.payAccountText = infos.payType;
      /* 还原数据 */
      this.withdrawTypeRender = this.withdrawTypeRender.map(item => {
        return {
          renderCheck: [{label: `我希望优先转到${item.payType}`, isCheck: item.id === infos.id ? true : false}],
          label: `${item.payType}账号: ${item.account}`,
          ...item
        }
      })
      // this.withdrawTypeRender = JSON.parse(JSON.stringify(clone));
      // this.withdrawTypeRender = [];
      // this.withdrawTypeRender = JSON.parse(JSON.stringify(clone));
    }
  }

  /* 提现 */
  public submitChange() {
    // this.apiIndexUserService.asyncFetchWithdrawCashOut()
    if (this.amountConfig.amount <= Number(this.amountInfo.balance)) {
      this.apiIndexUserService.asyncFetchWithdrawCashOut(this.amountConfig).subscribe(res => {
        this.presentToast('提交成功~将在3个工作日内提现到' + this.amountConfig.payAccountText, 'success');
        this.fetchAmountInfo();
      })
    } else {
      this.amountConfig.amount = Number(this.amountInfo.balance);
      this.presentToast('请输入小于您的余额的提现金额', 'danger');
    }
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

}
