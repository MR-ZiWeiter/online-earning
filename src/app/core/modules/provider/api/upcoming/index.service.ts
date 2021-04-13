import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})
export class ApiUpcomingService {

  constructor(
    private http: HttpService
  ) { }

  // 获取代办任务列表
  asyncFetchUpcomingList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/saloon', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
  /* 获取待办统计 */
  asyncFetchUpcomingStatistic(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/account_statistic', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

}
