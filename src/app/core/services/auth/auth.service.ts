import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';

import { UserService } from '../user/user.service';
import { CoreToolsFunction } from 'src/app/core/core.tools';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CoreToolsFunction {

  public isLoggedIn = false;

  public redirectUrl: string;

  constructor(
    private userService: UserService,
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
  // 公共登录
  public isWeChatOrH5Login(): void {
    if (this.isWeiXin()) {
      this.wechatLogin(this.redirectUrl);
    } else {
      this.router.navigate(['/pages/account/login']);
    }
  }
  // 登出
  public logout(): void {
    this.userService.setUserBasicInfo(null);
    this.userService.setWxAppToken(null);
    this.router.navigate(['/pages/account/login']);
  }
}
