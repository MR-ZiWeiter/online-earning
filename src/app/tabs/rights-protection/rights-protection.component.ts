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
    { label: '处理中', number: 2, value: 2 },
    { label: '已完成', number: 1, value: 3 }
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
  ) {
    /* 获取默认数据 */
    // this.switchFetchApplealInfo(2);
  }

  async ngOnInit() {
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

  public doRefresh(event?: any) {
    this.renderConfig.pageNum = 1;
    this.switchFetchApplealInfo((res) => {
      this.renderArrayInfo = res.rel;
      if (res.length === this.renderConfig.pageSize) {
        event && (event.target.disabled = false);
      } else {
        event && (event.target.disabled = false);
      }
      event && event.target.complete();
    }, () => {
      event && event.target.complete();
    })
  }

  public loadData(event: { target: { complete: () => void; disabled: boolean; }; }) {
    this.renderConfig.pageNum++;
    this.switchFetchApplealInfo((res) => {
      event.target.complete();
      if (this.renderConfig.pageSize * (this.renderConfig.pageNum - 1) > this.renderArrayInfo.length) {
        this.renderArrayInfo = this.renderArrayInfo.concat(res.rel);
        event.target.disabled = true;
      } else {
        this.renderArrayInfo = res.rel;
      }
    });
  }

}
