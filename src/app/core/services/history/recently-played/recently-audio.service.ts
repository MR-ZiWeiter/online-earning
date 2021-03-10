import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WorkIndexedDBService } from 'src/app/core/models/provider/indexedDB/work-indexedDB.service';

@Injectable({
  providedIn: 'root'
})
export class RecentlyAudioService {

  private audioAllConfig: Array<audioConfig> = [];

  private audioConfig: Array<audioConfig> = [];
  // 历史记录中间件
  private $audioConfig: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private workIndexedDBService: WorkIndexedDBService) {
    this.handlerIndexDBChange();
  }
  // 手动获取数据库数据
  public handlerIndexDBChange() {
    this.workIndexedDBService.selectByIndex('audio', 'audioNum', 'audio').subscribe((info) => {
      console.log('获取成功数据库数据---APP全局音频记录');
      // console.log(info);
      this.audioAllConfig = info;
      this.setAudioConfig({
        deep: true,
        value: this.changeAudioDeduplicationEvent(info)
      });
    });
  }
  public deleteSiginConfig(info: any): void {
    // this.workIndexedDBService.workdelete()
    if (info instanceof Array) {
      const cloneInfoArray = [];
      // 处理数据库重复数据
      info.map(item => {
        this.audioAllConfig.map(citem => {
          if (item.id === citem.audio.id) {
            cloneInfoArray.push(citem);
          }
        });
      });
      // console.log(cloneInfoArray);
      // 删除数据库
      [...info, ...cloneInfoArray].map(item => {
        this.workIndexedDBService.workdelete('audio', item.key || item.id).subscribe();
      });
    } else {
      // 处理数据库重复数据
      this.audioAllConfig.map(citem => {
        if (info.id === citem.audio.id) {
          this.workIndexedDBService.workdelete('audio', citem.audio.id).subscribe();
        }
      });
      this.workIndexedDBService.workdelete('audio', info.key).subscribe();
    }
    this.handlerIndexDBChange();
  }
  // sort排序 -- 倒叙
  private sortChangeAudioDedulicationEvent(infoArray: Array<audioConfig>): Array<audioConfig> {
    // console.log(infoArray);
    return infoArray.sort((a, b) => {
      return b.audio.time.getTime() - a.audio.time.getTime();
    });
  }
  // 去重 倒叙
  private changeAudioDeduplicationEvent(infoArray: Array<audioConfig>): Array<audioConfig> {
    const cloneObject = {};
    const cloneSortInfoArray = this.sortChangeAudioDedulicationEvent(infoArray);
    cloneSortInfoArray.forEach(item => {
      if (!cloneObject[item.audio.title]) {
        cloneObject[item.audio.title] = item;
      }
    });
    // console.log(cloneObject);
    return this.sortChangeAudioDedulicationEvent(Object.values(cloneObject));
  }
  public getAudioConfig(): Observable<any> {
    return this.$audioConfig.asObservable();
  }
  public setAudioConfig(info: any): void {
    if (info.deep) {
      this.audioConfig = info.value;
      this.$audioConfig.next(info.value);
    } else {
      this.audioConfig.push(info.value);
      this.$audioConfig.next(this.changeAudioDeduplicationEvent(this.audioConfig));
    }
  }
  public clearAudioConfig(): void {
    this.workIndexedDBService.clear('audio').subscribe(info => {
      this.setAudioConfig({
        deep: true,
        value: []
      });
    });
  }
  public setIndexedDBWithAudioConfig(info: any): void {
    const videoInfo: any = {
      audioNum: 'audio',
      audio: info
    };
    this.workIndexedDBService.insert('audio', videoInfo).subscribe(infos => {
      videoInfo.id = infos;
      this.setAudioConfig({
        deep: false,
        value: videoInfo
      });
    });
  }

}
