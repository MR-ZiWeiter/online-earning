import { UserService } from 'src/app/core/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { LoggerService } from 'src/app/core/modules/provider/logger/logger.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WebviewService } from 'src/app/core/services/webview/webview.service';
import { CoreValidators } from 'src/app/core/core.validator';
import { SystemService } from 'src/app/core/services/system/system.service';

@Component({
  selector: 'swipe-change-pwd',
  templateUrl: './change-pwd.page.html',
  styleUrls: ['./change-pwd.page.scss'],
})
export class ChangePwdPage implements OnInit {
  public validateForm!: FormGroup;
  // 提示显示类型
  public tipType = 'no';
  // 是否可提交
  public isSubmitStatus = false;
  // 登录成功后重定向地址
  public redirectUrl = null;
  public basicInfo: any = {};
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private navController: NavController,
    private userService: UserService,
    private systemService: SystemService,
    private webviewService: WebviewService,
    private userAccountService: UserAccountService) {
      this.userService.getUserBasicInfo().subscribe(renderInfo => {
        if (renderInfo) {
          this.basicInfo = renderInfo;
          if (this.validateForm && this.validateForm.controls['identifier']) {
            this.validateForm.controls['identifier'].setValue(this.basicInfo.realName || this.basicInfo.phone)
          }
        }
      })
    }

  ngOnInit() {
    this.validateForm = this.fb.group({
      accountType: [1],
      identifier: [this.basicInfo.realName || this.basicInfo.phone, [Validators.required]],
      credential: [null, [Validators.required, Validators.pattern(/^[0-9a-z-A-Z]{6,20}$/)]],
      newCredential: [null, [Validators.required, Validators.pattern(/^[0-9a-z-A-Z]{6,20}$/)]],
      checkPassword: [null, [Validators.required, CoreValidators.match('newCredential')]],
    });
  }
  // 提交
  public submitChange(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.userAccountService.asyncFetchAccountChangPwdInfo(this.validateForm.value).subscribe(res => {
        this.router.navigate(['/']);
        this.systemService.presentToast('修改成功', 'success');
        this.navController.back();
      })
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
