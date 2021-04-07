import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})

export class ApiAppealService {
  constructor(
    private http: HttpService
  ) { }

  // 维权列表
  asyncFetchAppealListInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/appeal/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
  /* 维权类型 */
  asyncFetchAppealTypesList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/appeal/rights_protection_type', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
  /* 提交维权 */
  asyncFetchSubmitAppealInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/buyer/appeal/add', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
  /* 维权详情 */
  asyncFetchAppealInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/appeal/details', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
}
