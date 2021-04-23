import { Component, OnInit } from '@angular/core';
import { LoginForm } from './login';
import { ToastController, NavController } from '@ionic/angular';
import { LoggerService } from './../../../core/modules/provider/logger/logger.service';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WebviewService } from 'src/app/core/services/webview/webview.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pages-account-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public loginForm: LoginForm = {
  //   accountType: 1,
  //   credential: null,
  //   identifier: null,
  //   loginMode: 'ACCOUNT_PASSWORD'
  // };
  public loginForm!: FormGroup;
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
    private fb: FormBuilder,
    private webviewService: WebviewService,
    private navControl: NavController,
    private router: Router,
    private toastController: ToastController,
    private userAccountService: UserAccountService,
    private userService: UserService,
    private authService: AuthService,
    private logger: LoggerService) {
      this.loginForm = fb.group({
        accountType: [1, [Validators.required]],
        identifier: [null, [Validators.required]],
        credential: [null, [Validators.required, Validators.pattern(/^[0-9a-z]{6,20}$/)]],
        loginMode: ['ACCOUNT_PASSWORD', [Validators.required]]
      })
    }

  ngOnInit() {
  }
  // 清楚指定值的表单数据
  // public clearInputChange(nameString: string): void {
  //   this.loginForm[nameString] = null;
  // }
  // 提交
  public submitChange(): void {
    if (this.loginForm.valid) {
      this.userAccountService.asyncAccountLogin(this.loginForm.value).subscribe(res => {
        this.router.navigate(['/']);
      }, err => {});
    } else {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
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
