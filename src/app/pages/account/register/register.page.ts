import { CoreValidators } from 'src/app/core/core.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { LoggerService } from 'src/app/core/modules/provider/logger/logger.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WebviewService } from 'src/app/core/services/webview/webview.service';

@Component({
  selector: 'pages-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm!: FormGroup;
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
    private fb: FormBuilder,
    private logger: LoggerService) {
      this.registerForm = fb.group({
        accountType: [1, [Validators.required]],
        identifier: [null, [Validators.required, Validators.pattern(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$|^[a-zA-Z0-9]{2,}$|/)]],
        credential: [null, [Validators.required, Validators.pattern(/^[0-9a-z]{6,20}$/)]],
        credential_check: [null, [Validators.required, Validators.pattern(/^[0-9a-z]{6,20}$/), CoreValidators.match('credential')]],
        nickname: [null, [Validators.required]],
        smsCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
        recommendCode: [null]
      })
    }

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
    if (!this.registerForm.controls.identifier.valid) {
      this.presentToastWithOptions();
    } else {
      this.userAccountService.asyncFetchAccountSmsCode({
        mobile: this.registerForm.get('identifier').value
      }).subscribe((res: any) => {
        this.settingTimeOutEvent();
      });
    }
  }
  // 提交
  public submitChange(): void {
    // console.log(this.registerForm);
    this.userAccountService.asyncAccountRegister(this.registerForm.value).subscribe(res => {
      this.router.navigate(['/']);
    }, err => {});
  }

  /* 登录账号 */
  public openLoginPage() {
    this.router.navigate(['/pages/account/login']);
  }

  public openRuleService(type: number): void {
    this.webviewService.openServiceRuleEvent(type);
  }
}
