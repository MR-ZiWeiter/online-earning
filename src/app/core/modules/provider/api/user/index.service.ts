import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// 数据类型
import { ApiResponseModel } from '../index.d';

import { HttpService } from '../../http/http.service';
// 注入中间件 用户信息
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable()

export class ApiUserIndexService {
  constructor(private http: HttpService, private userService: UserService) {}

  // 获取用户基本信息
  asyncFetchBasicInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/account-privacy/get', info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        this.userService.setUserBasicInfo(res.rel);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 个人主页信息
  asyncFetchUserHomeInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/account-privacy/index', info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        // this.userService.setUserBasicInfo(res.rel);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 获取提现方式
  asyncFetchWithdrawInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/capital-account/pay-account/list', info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 申请提现 */
  asyncFetchWithdrawCashOut(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/buyer/capital-account/cash-out', info, null, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 保存反馈意见
  asyncPostFeedback(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/saveFeedback', {}, {
        // 'Content-Type': 'application/json'
      }, info).subscribe((res: ApiResponseModel) => {
        console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 消息列表
  asyncFetchNotificationInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/message/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 提现记录 */
  asyncFetchWithdrawList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/capital-account/cash-out/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 资金明细 */
  asyncFetchCapitalList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/capital-account/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 公告 */
  asyncFetchNoticeList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/notice/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
}
