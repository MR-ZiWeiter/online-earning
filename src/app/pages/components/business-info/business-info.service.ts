import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessInfoService {

  /* 选择名片需要的中间件 */
  public _businessInfoConfig: IBusinessInfoConfigModel = {
    platformId: 1,
    businessName: null,
    selected: null,
    keyword: null
  };

  public $businessInfoConfig: BehaviorSubject<IBusinessInfoConfigModel> = new BehaviorSubject<IBusinessInfoConfigModel>(null);

  constructor() {
    // alert(1)
    console.log('---------------------------->')
    console.log(this._businessInfoConfig);
  }

  /* 插入值 */
  public setBusinessInfoConfig(info: IBusinessInfoConfigModel) {
    /* 继承属性数据 */
    const assignInfo = Object.assign({}, this._businessInfoConfig, info);
    this._businessInfoConfig = assignInfo;
    this.$businessInfoConfig.next(assignInfo);
  }
  /* 获取值 */
  public getBusinessInfoConfig(): Observable<IBusinessInfoConfigModel> {
    return this.$businessInfoConfig.asObservable();
  }

}
