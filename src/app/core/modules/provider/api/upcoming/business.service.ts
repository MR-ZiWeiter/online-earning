import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})
export class ApiBusinessService {

  constructor(
    private http: HttpService
  ) { }

  // 解析名片
  asyncFetchBusinessInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/buyer/buyer-account/add', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 电商平台类别
  asyncFetchPlatformListInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/common/platform/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 获取名片列表
  asyncFetchBusinessList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/buyer-account/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 检查名片详情-查询名片
  asyncFetchBusinessAccountInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/buyer/buyer-account/check', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 修改名片备注 */
  asyncPutBusinessRemarkInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.put('/buyer/buyer-account/update/remark', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 修改名片地址图片 */
  asyncPutBusinessAddressInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.put('/buyer/buyer-account/update/address', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 删除名片 */
  asyncPutBusinessDeleteInfo(info: any = null): Observable<any> {
    return new Observable(observer => {
      this.http.delete(`/buyer/buyer-account/delete/${info}`, info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
}
