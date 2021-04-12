import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, PickerController } from '@ionic/angular';
import { ApiUpcomingService } from 'src/app/core/modules/provider/api';
import { BusinessInfoComponent } from 'src/app/pages/components/business-info/business-info.component';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  public saloonRenderConfig = {
    buyerAccountId: '',
    pageNum: 1,
    pageSize: 20
  }

  public renderArray: any[] = []

  @ViewChild('swiperCustomMenu') private swiperCustomMenuComponent: BusinessInfoComponent;

  constructor(
    private router: Router,
    private menu: MenuController,
    private ionPickerCotroller: PickerController,
    private apiUpcomingService: ApiUpcomingService
  ) { }

  ngOnInit() {
  }

  private loadSaloonInfo(fn?: Function, err?: Function) {
    this.apiUpcomingService.asyncFetchUpcomingList(this.saloonRenderConfig).subscribe(res => {
      // console.log(res)
      fn &&  fn(res.rel);
    })
  }

  doRefresh(event?: any) {
    this.saloonRenderConfig.pageNum = 1;
    this.loadSaloonInfo((remderArray) => {
      this.renderArray = remderArray;
      if (remderArray.length === this.saloonRenderConfig.pageSize) {
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
    this.saloonRenderConfig.pageNum++;
    this.loadSaloonInfo((renderArray) => {
      event.target.complete();
      if (this.saloonRenderConfig.pageSize * (this.saloonRenderConfig.pageNum - 1) > this.renderArray.length) {
        this.renderArray = this.renderArray.concat(renderArray);
        event.target.disabled = true;
      } else {
        this.renderArray = renderArray;
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
    this.saloonRenderConfig.buyerAccountId = ev.id;
    this.doRefresh();
  }

  /* 打开新名片 */
  public openNewCartePage() {
    this.router.navigate(['/pages/carte/step-1'])
  }

}
