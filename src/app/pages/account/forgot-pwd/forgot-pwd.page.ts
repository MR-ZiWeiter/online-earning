import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { LoggerService } from 'src/app/core/modules/provider/logger/logger.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WebviewService } from 'src/app/core/services/webview/webview.service';

@Component({
  selector: 'swipe-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage implements OnInit {

  public registerForm: RegisterForm|any = {
    username: null,
    code: null,
    phone: null,
    password: null,
    check_password: null,
    phone_code: null
  };
  // 获取验证码状态
  public getCodeStatus = false;
  public timeOut = 60;
  // 提示显示类型
  public tipType = 'no';
  // 是否可提交
  public isSubmitStatus = false;
  // 登录成功后重定向地址
  public redirectUrl = null;
  constructor(
    private webviewService: WebviewService,
    private navControl: NavController,
    private router: Router,
    private toastController: ToastController,
    private userAccountService: UserAccountService,
    private authService: AuthService,
    private logger: LoggerService) { }

  ngOnInit() {
  }
  // 设置倒计时
  public settingTimeOutEvent(): void {
    this.getCodeStatus = true;
    this.timeOut = 60;
    const getCodeTimer = setInterval(() => {
      this.timeOut--;
      if (this.timeOut === 0) {
        clearInterval(getCodeTimer);
        this.getCodeStatus = false;
        this.tipType = 'no';
      }
    }, 1000);
  }
  // 清楚指定值的表单数据
  public clearInputChange(nameString: string): void {
    this.registerForm[nameString] = null;
  }
  // 手机验证
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: '请输入正确的手机号码!',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
  // 获取验证码
  public fetchCodeEvent(): void {
    if (!this.registerForm.phone) {
      this.presentToastWithOptions();
    } else {
      this.userAccountService.asyncFetchAccountLoginRegisterCode({
        phone: this.registerForm.phone
      }).subscribe((res: any) => {
        this.settingTimeOutEvent();
      });
    }
  }
  // 提交
  public submitChange(): void {
    // console.log(this.registerForm);
    this.userAccountService.asyncAccountLogin(this.registerForm).subscribe(res => {
      // console.log(this.navControl);
      // if (this.navControl.direction
      // this.navControl.back();
      this.router.navigate(['/']);
    }, err => {});
  }

  /* 登录账号 */
  public openLoginPage() {
    this.router.navigate(['/pages/account/login'])
  }

  public openRuleService(type: number): void {
    this.webviewService.openServiceRuleEvent(type);
  }

}
