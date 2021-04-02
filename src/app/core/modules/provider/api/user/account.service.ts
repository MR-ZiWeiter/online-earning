import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { LoginForm } from 'src/app/pages/account/login/login.d';
import { ApiResponseModel } from './../index.d';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable()

export class UserAccountService {
  constructor(
    private http: HttpService,
    private userService: UserService
  ) {}

  // 登录
  asyncAccountLogin(info: LoginForm): Observable<any> {
    return new Observable(observer => {
      this.http.post('/login/login/in', {}, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(res.rel.token);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 注册
  asyncAccountRegister(info: RegisterForm): Observable<any> {
    return new Observable(observer => {
      this.http.post('/login/register', {}, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(res.rel.token);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 刷新TOKEN
  asyncAccountRefreshToken(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/login/token/refresh', info, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(res.rel.token);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 注册验证码获取
  asyncFetchAccountRegisterCode(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/open/sms/code/register', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 获取修改手机号验证码
  asyncFetchAccountLoginRegisterCode(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/open/sms/code/change/mobile', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 注销账户
  asyncAccountLogoutOff(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/writeOff', info, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(null);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 注销账户检查
  asyncAccountCheckLogoutOff(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/user/writeOff/check', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 修改基本信息
  asyncAccountEditBaiscInfoChange(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/updateUserBasicInfo', {}, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
}
