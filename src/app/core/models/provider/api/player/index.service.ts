import { ApiResponseModel } from './../index.d';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable()

export class ApiPlayerService {
  constructor(private http: HttpService) {}

  // 专辑视频音频播放
  asyncFetchAlbumInfoList(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/child-service/album/item', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      }, error => {
        // console.log('我是错误');
        observer.error(error);
      });
    });
  }

  // 收藏 添加喜欢或者取消喜欢
  asyncPostRecentLikeStatus(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/child-service/user/recentLikeSave', info, {}, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 资源播放前调用接口 VIP专用
  asyncFetchResourcesInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/child-service/res/play', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }

  // 资源播放前调用接口 非VIP
  asyncFetchNoVipResourcesInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/child-service/res', info).subscribe((res: ApiResponseModel) => {
        observer.next(res.rel);
      });
    });
  }
}
