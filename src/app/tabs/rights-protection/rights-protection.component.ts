import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PickerController, ModalController } from '@ionic/angular';
import { ApiAppealService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'app-rights-protection',
  templateUrl: './rights-protection.component.html',
  styleUrls: ['./rights-protection.component.scss']
})
export class RightsProtectionComponent implements OnInit {

  public buysArray: any[] = [];

  public tabConfig: any[] = [
    { label: '处理中', number: 0, value: 2 },
    { label: '已完成', number: 0, value: 3 }
  ];
  private renderConfig: any = {
    pageNum: 1,
    pageSize: 20,
    status: 2
  };

  public set tabSelect(n: number) {
    this.renderConfig.status = n;
    this.doRefresh();
    // this.switchFetchApplealInfo(n);
  }
  public get tabSelect(): number {
    return this.renderConfig.status;
  }

  public renderArrayInfo: any[] = [];

  constructor(
    private router: Router,
    private menu: MenuController,
    private ionPickerCotroller: PickerController,
    private apiAppealService: ApiAppealService
  ) {}

  async ngOnInit() {
    /* 获取默认数据 */
    this.doRefresh();
  }

  /* 获取维权列表 */
  public switchFetchApplealInfo(fn?: Function, err?: Function) {
    this.apiAppealService.asyncFetchAppealListInfo(this.renderConfig).subscribe(res => {
      // console.log(res)
      // this.renderArrayInfo = res.rel;
      fn && fn(res);
    }, error => {
      err && err(error);
    })
  }

  /* 获取状态统计 */
  private fetchAppealStatistic() {
    this.apiAppealService.asyncFetchAppealStatistic().subscribe(res => {
      // console.log(res)
      this.tabConfig = res.rel.map(item => {
        return {
          label: item.statusLabel,
          number: item.amount,
          value: item.status
        }
      })
    })
  }

  public doRefresh(event?: any) {
    this.renderConfig.pageNum = 1;
    this.fetchAppealStatistic();
    this.switchFetchApplealInfo((res) => {
      this.renderArrayInfo = res.rel.list;
      if (res.rel.list.length === this.renderConfig.pageSize) {
        event && (event.target.disabled = false);
      } else {
        event && (event.target.disabled = false);
      }
      event && event.target.complete();
    }, () => {
      event && event.target.complete();
    })
  }

  public loadData(event: any) {
    this.renderConfig.pageNum++;
    this.switchFetchApplealInfo((res) => {
      event.target.complete();
      this.renderArrayInfo = this.renderArrayInfo.concat(res.rel.list);
      event.target.disabled = true;
    });
  }

}
