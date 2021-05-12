import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiUpcomingService } from 'src/app/core/modules/provider/api';
import { IApiBusinessSaloonInfoModel } from 'src/app/core/model';
import { BusinessInfoService } from '../../components/business-info/business-info.service';

@Component({
  selector: 'swipe-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit, OnDestroy {

  /* 筛选配置 */
  public saloonRenderConfig = {
    buyerAccountId: '',
    pageNum: 1,
    pageSize: 20
  }
  /* 渲染数据集合 */
  public saloonRenderArray: IApiBusinessSaloonInfoModel[] = [];

  /* 观察者对象 */
  private privateBusinessScribe: any;

  constructor(
    private businessInfoService: BusinessInfoService,
    private apiUpcomingService: ApiUpcomingService,
    private activatedRoute: ActivatedRoute
  ) {
    /* URL处理数据 */
    const urlParams = activatedRoute.snapshot.params;
    this.saloonRenderConfig.buyerAccountId = urlParams.id;
    if (urlParams && urlParams.id) {
      businessInfoService.setBusinessInfoConfig({
        selected: urlParams.id
      })
    }
    /* 监听选择名片回调 */
    this.privateBusinessScribe = this.businessInfoService.getBusinessInfoConfig().subscribe(res => {
      // console.log(res)
      if (res && res.selected) {
        this.saloonRenderConfig.buyerAccountId = res.selected;
      }
    });
  }

  ngOnInit() {
    this.loadSaloonInfo();
  }

  /* 回调数据更新 */
  public reLoadBusinessInfoChange(info: any) {
    this.businessInfoService.setBusinessInfoConfig({
      selected: info.id,
      businessName: info.nickname
    });
  }

  private loadSaloonInfo() {
    this.apiUpcomingService.asyncFetchUpcomingList(this.saloonRenderConfig).subscribe(res => {
      // console.log(res)
      this.saloonRenderArray = res.rel.list;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.privateBusinessScribe.unsubscribe();
  }

}
