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
    this.switchFetchApplealInfo(n);
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
    this.switchFetchApplealInfo(2);
  }

  async ngOnInit() {
  }

  /* 获取维权列表 */
  public switchFetchApplealInfo(state: number) {
    this.apiAppealService.asyncFetchAppealListInfo({
      status: state
    }).subscribe(res => {
      // console.log(res)
      this.renderArrayInfo = res.rel;
    })
  }

  public doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  public loadData(event: { target: { complete: () => void; disabled: boolean; }; }) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.buysArray.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  public openMenuInfo() {
    this.menu.open('end');
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

  /* 打开新名片 */
  public openNewCartePage() {
    this.router.navigate(['/pages/carte/step-1'])
  }

  public segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.switchFetchApplealInfo(ev.detail.value);
  }

}
