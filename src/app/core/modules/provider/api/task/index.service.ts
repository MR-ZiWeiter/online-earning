import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})
export class ApiTaskIndexService {

  constructor(
    private http: HttpService
  ) { }

  // 接手任务
  asyncFetchTaskTakeInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/take_over', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 开始任务
  asyncFetchTaskStartInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/start_task', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 提交任务
  asyncFetchTaskSubmitInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/buyer/order/submit_task', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 任务列表 */
  asyncFetchTaskListInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 任务详情 */
  asyncFetchTaskDetailInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/details', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 任务统计 */
  asyncFetchTaskStatistic(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/status_statistic', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 取消任务 */
  asyncFetchTaskCancel(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/buyer/order/cancel', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

}
