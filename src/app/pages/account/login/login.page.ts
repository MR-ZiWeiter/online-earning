import { Component, OnInit } from '@angular/core';
import { LoginForm } from './login';
import { ToastController, NavController } from '@ionic/angular';
import { LoggerService } from './../../../core/modules/provider/logger/logger.service';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WebviewService } from 'src/app/core/services/webview/webview.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-account-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: LoginForm = {
    phone: null,
    password: null
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
    private userService: UserService,
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
    this.loginForm[nameString] = null;
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
    if (!this.loginForm.phone) {
      this.presentToastWithOptions();
    } else {
      this.userAccountService.asyncFetchAccountLoginRegisterCode({
        phone: this.loginForm.phone
      }).subscribe((res: any) => {
        this.settingTimeOutEvent();
      });
    }
  }
  // 提交
  public submitChange(): void {
    // console.log(this.loginForm);
    this.userService.setAppToken('1234567890');
    this.router.navigate(['/'])
    // this.userAccountService.asyncAccountLoginRegister(this.loginForm).subscribe(res => {
    //   this.router.navigate(['/']);
    // }, err => {});
  }

  /* 注册新账户 */
  public openRegisterPage() {
    this.router.navigate(['/pages/account/register'])
  }

  /* 忘记密码 */
  public openForgotPasswordPage() {
    this.router.navigate(['/pages/account/forgot-pwd'])
  }

  public openRuleService(type: number): void {
    this.webviewService.openServiceRuleEvent(type);
  }

}
