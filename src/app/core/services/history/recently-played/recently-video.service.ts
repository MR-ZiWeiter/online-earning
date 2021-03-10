import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WorkIndexedDBService } from 'src/app/core/models/provider/indexedDB/work-indexedDB.service';

@Injectable({
  providedIn: 'root'
})
export class RecentlyVideoService {

  private videoAllConfig: Array<videoConfig> = [];

  private videoConfig: Array<videoConfig> = [];
  // 历史记录中间件
  private $videoConfig: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private workIndexedDBService: WorkIndexedDBService) {
    this.handlerIndexDBChange();
  }
  // 手动获取数据库数据
  public handlerIndexDBChange() {
    this.workIndexedDBService.selectByIndex('video', 'videoNum', 'video').subscribe((info) => {
      console.log('获取成功数据库数据---APP全局视频记录');
      console.log(info);
      this.videoAllConfig = info;
      this.setVideoConfig({
        deep: true,
        value: this.changeVideoDeduplicationEvent(info)
      });
    });
  }
  // sort排序 -- 倒叙
  private sortChangeAudioDedulicationEvent(infoArray: Array<audioConfig>): Array<audioConfig> {
    // console.log('------------>')
    // console.log(infoArray.sort((a, b) => {
    //   return b.video.time.getTime() - a.video.time.getTime();
    // }));
    return infoArray.sort((a, b) => {
      return b.video.time.getTime() - a.video.time.getTime();
    });
  }
  // 去重 倒叙
  private changeVideoDeduplicationEvent(infoArray: Array<videoConfig>): Array<videoConfig> {
    const cloneObject = {};
    const cloneSortInfoArray = this.sortChangeAudioDedulicationEvent(infoArray);
    cloneSortInfoArray.forEach(item => {
      if (!cloneObject[item.video.id]) {
        cloneObject[item.video.id] = item;
      }
    });
    // console.log(cloneObject);
    // 再排序 由于对象自动有序
    return this.sortChangeAudioDedulicationEvent(Object.values(cloneObject));
  }
  public getVideoConfig(): Observable<any> {
    return this.$videoConfig.asObservable();
  }
  public setVideoConfig(info: any): void {
    if (info.deep) {
      this.videoConfig = info.value;
      this.$videoConfig.next(info.value);
    } else {
      this.videoConfig.push(info.value);
      this.$videoConfig.next(this.changeVideoDeduplicationEvent(this.videoConfig));
    }
  }
  public deleteSiginConfig(info: any): void {
    // this.workIndexedDBService.workdelete()
    if (info instanceof Array) {
      const cloneInfoArray = [];
      // 处理数据库重复数据
      info.map(item => {
        this.videoAllConfig.map(citem => {
          if (item.id === citem.video.id) {
            cloneInfoArray.push(citem);
          }
        });
      });
      // console.log(cloneInfoArray);
      // 删除数据库
      [...info, ...cloneInfoArray].map(item => {
        this.workIndexedDBService.workdelete('video', item.key || item.id).subscribe();
      });
    } else {
      // 处理数据库重复数据
      this.videoAllConfig.map(citem => {
        if (info.id === citem.video.id) {
          this.workIndexedDBService.workdelete('video', citem.video.id).subscribe();
        }
      });
      this.workIndexedDBService.workdelete('video', info.key).subscribe();
    }
    this.handlerIndexDBChange();
  }
  public clearVideoConfig(): void {
    this.workIndexedDBService.clear('video').subscribe(info => {
      this.setVideoConfig({
        deep: true,
        value: []
      });
    });
  }
  public setIndexedDBWithVideoConfig(info: any): void {
    const videoInfo: any = {
      videoNum: 'video',
      video: info
    };
    this.workIndexedDBService.insert('video', videoInfo).subscribe(infos => {
      videoInfo.id = infos;
      this.setVideoConfig({
        deep: false,
        value: videoInfo
      });
    });
  }

}
