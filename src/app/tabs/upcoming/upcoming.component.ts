import { BusinessInfoService } from 'src/app/pages/components/business-info/business-info.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { ApiUpcomingService } from 'src/app/core/modules/provider/api';
import { BusinessInfoComponent } from 'src/app/pages/components/business-info/business-info.component';
import { SystemService } from 'src/app/core/services/system/system.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  /* 名片选择配置 */
  public businessConfig: any;

  public saloonRenderConfig = {
    buyerAccountId: '',
    pageNum: 1,
    pageSize: 20
  }

  /* 计总 */
  public upcomingConfig = {
    checking: 0,
    success: 0
  };

  public renderArray: any[] = []

  @ViewChild('swiperCustomMenu') private swiperCustomMenuComponent: BusinessInfoComponent;

  constructor(
    private router: Router,
    private systemService: SystemService,
    private ionPickerCotroller: PickerController,
    private businessInfoService: BusinessInfoService,
    private apiUpcomingService: ApiUpcomingService
  ) {
    this.businessInfoService.getBusinessInfoConfig().subscribe((info: any) => {
      // console.log('*******************************')
      // console.log(info)
      this.businessConfig = info;
      if (info && info.selected) {
        this.saloonRenderConfig.buyerAccountId = info.selected;
      }
    })
  }

  ngOnInit() {
  }

  /* 获取数量计总 */
  private fetchUpcomingCount() {
    this.apiUpcomingService.asyncFetchUpcomingStatistic().subscribe(res => {
      // console.log(res)
      res.rel.map(item => {
        if (item.status === 2) {
          this.upcomingConfig.checking = item.amount
        } else if (item.status === 3) {
          this.upcomingConfig.success = item.amount
        }
      })
    })
  }

  private loadSaloonInfo(fn?: Function, err?: Function) {
    if (!this.saloonRenderConfig.buyerAccountId) {
      this.systemService.presentToast('请选择名片后再试', 'danger');
      err && err();
      return false;
    }
    this.apiUpcomingService.asyncFetchUpcomingList(this.saloonRenderConfig).subscribe(res => {
      // console.log(res)
      fn && fn(res.rel.list);
    })
  }

  doRefresh(event?: any) {
    this.saloonRenderConfig.pageNum = 1;
    this.fetchUpcomingCount();
    this.loadSaloonInfo((renderArray) => {
      this.renderArray = renderArray.map(item => {
        item.award = item.award * 100
        return item
      });
      if (renderArray.length === this.saloonRenderConfig.pageSize) {
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
    this.saloonRenderConfig.pageNum++;
    this.loadSaloonInfo((renderArray) => {
      event.target.complete();
      if (this.saloonRenderConfig.pageSize * (this.saloonRenderConfig.pageNum - 1) > this.renderArray.length) {
        this.renderArray = this.renderArray.concat(renderArray.map(item => {
          item.award = item.award * 100
          return item
        }));
        event.target.disabled = true;
      } else {
        this.renderArray = renderArray.map(item => {
          item.award = item.award * 100
          return item
        });
      }
    });
  }

  /* 打开侧栏菜单 */
  public openMenuInfo() {
    this.swiperCustomMenuComponent.openMenuInfo();
  }

  public async openPlatformPickerEvent() {
    const customPicker = await this.ionPickerCotroller.create({
      columns: [
        {
          name: '选择平台',
          options: [
            {
              text: '淘宝',
              value: '1'
            }
          ]
        }
      ]
    })
    customPicker.present()
  }

  /* 名片回调 */
  public businessChange(ev: {id: string; key: string}) {
    if (ev.id) {
      this.doRefresh();
      this.saloonRenderConfig.buyerAccountId = ev.id;
    }
  }

  /* 打开新名片 */
  public openNewCartePage() {
    this.router.navigate(['/pages/carte/step-1'])
  }

}
