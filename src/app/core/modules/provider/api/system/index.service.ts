import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})

export class ApiSystemService {
  constructor(
    private http: HttpService
  ) {}

  // 获取JSSDK信息
  asyncFetchSystemWxJSSDK(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/wx/mp/auth/jsapiSignature', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 获取客服联系电话
  asyncFetchSystemKFContact(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/app/servicePhone', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 上传文件
  asyncFetchSystemUpLoadFile(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/upload/file', {noHeader: true}, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 查询银行卡信息列表 */
  asyncFetchSystemBankList(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/common/bank/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
}
