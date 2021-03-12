import { ApiResponseModel } from './../index.d';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable()

export class ApiSearchService {
  constructor(private http: HttpService) {}

  // 搜索一级页面
  asyncFetchSearchLevelOneInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/search/levelOne', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 热门搜索关键词
  asyncFetchSearchHotSearchKeysInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/search/hotSearch', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 专辑查看更多
  asyncFetchSearchHotSearchKeysAlbumMoreInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/search/albumList', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 单个资源查看更多
  asyncFetchSearchHotSearchKeysResMoreInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/search/resList', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }
}
