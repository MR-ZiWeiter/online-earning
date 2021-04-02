import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';

import { UserService } from '../user/user.service';
import { CoreToolsFunction } from 'src/app/core/core.tools';
import { UserAccountService } from 'src/app/core/modules/provider/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CoreToolsFunction {

  public isLoggedIn = false;

  public redirectUrl: string;

  constructor(
    private userService: UserService,
    private apiAccountService: UserAccountService,
    private router: Router
  ) {
    super();
    this.userService.getWxAppToken().subscribe((info) => {
      if (info) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  // 使用微信登录
  public wechatLogin(infoUrl: string) {
    const localUrl = infoUrl ? encodeURIComponent(infoUrl) : encodeURIComponent(window.location.href);
    const redirectUrl = encodeURIComponent(`${environment.BASIC_URL}/pages/account/auto-login?redirectUrl=${localUrl}`);
    window.location.href = `${environment.API_URL}/service/wx/mp/auth/oauth2?callBackUrl=${redirectUrl}`;
  }
  // 重新获取Token 刷新Token
  public refreshToken() {
    setTimeout(() => {
      this.apiAccountService.asyncAccountRefreshToken({
        token: this.userService.token
      }).subscribe()

    }, 5000)
  }
  // 公共登录
  public isWeChatOrH5Login(): void {
    // if (this.isWeiXin()) {
    // this.wechatLogin(this.redirectUrl);
    // } else {
    this.router.navigate(['/pages/account/login']);
    // }
  }
  // 登出
  public logout(): void {
    this.userService.setUserBasicInfo(null);
    this.userService.setAppToken(null);
    this.router.navigate(['/pages/account/login']);
  }
}
