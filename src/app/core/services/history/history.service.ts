import { tap, delay } from 'rxjs/operators';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { WorkIndexedDBService } from 'src/app/core/models/provider/indexedDB/work-indexedDB.service';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  private historyConfig: Array<historyConfig> = [];
  // 历史记录中间件
  private $historyConfig: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private workIndexedDBService: WorkIndexedDBService) {
    this.workIndexedDBService.selectByIndex('history', 'historyIndex', 'history').subscribe((info) => {
      console.log('获取成功数据库数据---APP全局历史记录');
      console.log(info);
      if (!info || info.length === 0) {} else {
        this.setHistoryConfig({
          deep: true,
          value: this.changeHistoryDeduplicationEvent(info)
        });
      }
    });
  }
  // 去重 倒叙
  private changeHistoryDeduplicationEvent(infoArray: Array<historyConfig>): Array<historyConfig> {
    const cloneObject = {};
    infoArray.forEach(item => {
      cloneObject[item.history.title] = item;
    });
    return Object.values(cloneObject).reverse();
  }
  public getHistoryConfig(): Observable<any> {
    return this.$historyConfig.asObservable();
  }
  public setHistoryConfig(info: any): void {
    if (info.deep) {
      this.historyConfig = info.value;
      this.$historyConfig.next(info.value);
    } else {
      this.historyConfig.push(info.value);
      this.$historyConfig.next(this.changeHistoryDeduplicationEvent(this.historyConfig));
    }
  }
  public clearHistoryConfig(): void {
    this.workIndexedDBService.clear('history').subscribe(info => {
      this.setHistoryConfig({
        deep: true,
        value: []
      });
    });
  }
  public setIndexedDBWithHistoryConfig(info: any): void {
    const historyInfo: any = {
      historyIndex: 'history',
      history: info
    };
    this.workIndexedDBService.insert('history', historyInfo).subscribe(infos => {
      historyInfo.id = infos;
      this.setHistoryConfig({
        deep: false,
        value: historyInfo
      });
    });
  }
}
