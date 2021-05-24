import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { WebviewService } from 'src/app/core/services/webview/webview.service';
import { CoreValidators } from 'src/app/core/core.validator';
import { SystemService } from 'src/app/core/services/system/system.service';

@Component({
  selector: 'swipe-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage implements OnInit {

  public validateForm!: FormGroup;

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
    private router: Router,
    private fb: FormBuilder,
    private systemService: SystemService,
    private webviewService: WebviewService,
    private userAccountService: UserAccountService) {
      this.validateForm = fb.group({
        accountType: [1],
        smsCode: [null, [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
        identifier: [null, [Validators.required, Validators.pattern(/^1[3-9]{1}[0-9]{9}$/)]],
        credential: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,20}$/)]],
        check_password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,20}$/), CoreValidators.match('credential')]],
      });
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
    this.validateForm.value[nameString] = null;
  }
  // 获取验证码
  public fetchCodeEvent(): void {
    if (!this.validateForm.valid) {
      this.systemService.presentToast('请输入正确的手机号码!', 'danger');
    } else {
      this.userAccountService.asyncFetchAccountSmsCode({
        mobile: this.validateForm.value.phone
      }).subscribe((res: any) => {
        this.settingTimeOutEvent();
      });
    }
  }
  // 提交
  public submitChange(): void {
    /* 校验表单 */
    CoreValidators.deepCheckForm(this.validateForm);
    /* 提交数据 */
    if (this.validateForm.valid) {
      this.userAccountService.asyncFetchAccountFindPwdInfo(this.validateForm.value).subscribe(res => {
        this.router.navigate(['/']);
      }, err => {});
    } else {
      this.systemService.presentToast('请完善表单后提交', 'danger');
    }
  }

  /* 登录账号 */
  public openLoginPage() {
    this.router.navigate(['/pages/account/login'])
  }

  public openRuleService(type: number): void {
    this.webviewService.openServiceRuleEvent(type);
  }

}
