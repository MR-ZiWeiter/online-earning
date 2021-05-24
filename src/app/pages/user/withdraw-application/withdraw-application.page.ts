import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiUserIndexService } from 'src/app/core/modules/provider/api';
import { PaytypePipe } from 'src/app/core/pipes';

@Component({
  selector: 'swipe-withdraw-application',
  templateUrl: './withdraw-application.page.html',
  styleUrls: ['./withdraw-application.page.scss'],
  providers: [
    PaytypePipe
  ]
})
export class WithdrawApplicationPage implements OnInit {

  public amountConfig: any = {
    amount: null,
    payAccountId: 0
  };

  public amountInfo: any = {};

  public withdrawTypeRender: any[] = [];

  public handlerPayTypeInfo() {
    let result: any = {};
    this.withdrawTypeRender.some(item => {
      if (item.id === Number(this.amountConfig.payAccountId)) {
        result = item;
        return true;
      }
      return false;
    })
    return result;
  };

  constructor(
    private paytypePipe: PaytypePipe,
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
      this.withdrawTypeRender = res.rel;
      this.amountConfig.payAccountId = res.rel[0].id;
    })

  }

  /* 提现 */
  public submitChange() {
    // this.apiIndexUserService.asyncFetchWithdrawCashOut()
    if (!this.amountConfig.amount) {
      this.presentToast('请输入大于0的提现金额', 'danger');
      return
    }
    if (this.amountConfig.amount <= Number(this.amountInfo.balance) / 100) {
      this.apiIndexUserService.asyncFetchWithdrawCashOut({
        ...this.amountConfig,
        amount: this.amountConfig.amount * 100
      }).subscribe(res => {
        this.presentToast('提交成功~将在3个工作日内提现到' + this.paytypePipe.transform(this.handlerPayTypeInfo().payType), 'success');
        this.amountConfig.amount = null;
        this.fetchAmountInfo();
      })
    } else {
      this.amountConfig.amount = Number(this.amountInfo.balance);
      this.presentToast('请输入小于您的余额的提现金额', 'danger');
    }
  }

  /* 全部提现 */
  public amountAllChange() {
    this.amountConfig.amount = this.amountInfo.balance / 100;
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
