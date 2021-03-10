import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from './../index.d';

@Injectable()

export class ApiTakeLookService {
  constructor(private http: HttpService) {}

  // 看一看首页
  asyncIndexHomeInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/home/video', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 看一看/听一听首页上滑加载更多
  asyncIndexHotMoreInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/home/hot', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 首页顶部Label列表
  asyncIndexLabelInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/category', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 广告页
  asyncBannerInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/app/advertise/list', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 专辑分类
  asyncOtherAlbumByModelInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/album', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }
}
