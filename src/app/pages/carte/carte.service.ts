import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  /* 处理 */
  public carteConfig: any = {
    step: 1,
    title: '添加名片'
  };

  private $carteConfig: BehaviorSubject<any> = new BehaviorSubject<any>(this.carteConfig);

  constructor() { }

  public getCarteConfig() {
    return this.$carteConfig.asObservable();
  }

  public setCarteConfig(info: any) {
    this.carteConfig = info;
    this.$carteConfig.next(info);
  }

}
