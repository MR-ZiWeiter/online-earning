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

  // 登录注册
  asyncAccountLoginRegister(info: LoginForm): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/login/phone', info, {}, {}).subscribe((res: ApiResponseModel) => {
        this.userService.setWxAppToken(res.rel);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 发送验证码
  asyncFetchAccountLoginRegisterCode(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/sendValidate', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 验证原手机号(更换手机号第一步)
  asyncAccountVerifyPhone(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/phone/verify', info, {}, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 绑定新手机号(更换手机号第二步)
  asyncAccountChangePhone(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/phone/change', info, {}, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 第一次绑定手机号
  asyncAccountBindPhone(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/phone/bind', info, {}, {}).subscribe((res: ApiResponseModel) => {
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
        this.userService.setWxAppToken(null);
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
