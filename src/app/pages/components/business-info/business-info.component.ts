import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController, PickerController } from '@ionic/angular';

import { ApiBusinessService } from 'src/app/core/modules/provider/api';
import { BusinessInfoService } from './business-info.service';

@Component({
  selector: 'swipe-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {

  public nickname!: string;

  public businessConfig = {
    nickname: '',
    pageNum: 1,
    pageSize: 20
  }

  public buysArray: any[] = []

  /* 获取平台信息 */
  private platformRenderArray: any[] = [];
  public paltformInfo: string|number = 1;

  /* 获取名片列表 */
  public businessRenderArray: any[] = [];

  /* 传入绑定的Key */
  @Input() public menuKey!: string;

  /* 回传选择名片后事件 */
  @Output() private change: EventEmitter<{id: string; key: string}> = new EventEmitter<{id: string; key: string}>();

  constructor(
    private menu: MenuController,
    private ionPickerCotroller: PickerController,
    private apiBusinessService: ApiBusinessService,
    private businessInfoService: BusinessInfoService
  ) { }

  ngOnInit() {
    this.fetchPlatformInfo();
  }

  /* 获取电商平台列表 */
  private fetchPlatformInfo() {
    this.apiBusinessService.asyncFetchPlatformListInfo().subscribe(res => {
      // console.log(res)
      this.platformRenderArray = res.rel;
    })
  }

  public loadData(event: any) {
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

  /* 打开名片菜单 */
  public openMenuInfo() {
    this.menu.enable(true, this.menuKey);
    this.menu.open(this.menuKey);
  }

  /* 关闭菜单 */
  public closeMenuInfo() {
    this.menu.close(this.menuKey);
  }

  /* 获取名片列表 */
  public fetchBusinessListInfo() {
    this.apiBusinessService.asyncFetchBusinessList({
      platformId: this.paltformInfo,
      ...this.businessConfig
    }).subscribe(res => {
      // console.log(res)
      this.businessRenderArray = res.rel.list;
    })
  }

  /* 操作列表后需要刷新的操作 */
  public refreshChange(info: boolean) {
    this.fetchBusinessListInfo();
  }

  public transformValues(info: any): string {
    let resultString: string;
    this.platformRenderArray.some(item => {
      if (item.id === info) {
        resultString = item.title;
        return true
      }
      return false
    })
    return resultString
  }

  /* 打开平台选项 */
  public async openPlatformPickerEvent(ev: MouseEvent) {
    const customPicker = await this.ionPickerCotroller.create({
      mode: "ios",
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          role: 'confirm',
          handler: (value) => {
            // console.log(value)
            this.paltformInfo = value['platform'].value;
            this.fetchBusinessListInfo();
          }
        }
      ],
      columns: [
        {
          name: 'platform',
          options: this.platformRenderArray.map(item => {
            return {
              text: item.title,
              value: item.id
            }
          })
        }
      ]
    })
    customPicker.present()
  }

  /* 选择名片回调 */
  public changeBusiness(ev: any) {
    this.businessInfoService.setBusinessInfoConfig({
      selected: ev.id,
      businessName: ev.key
    });
    /* 关闭Menu */
    this.closeMenuInfo();
    /* 回传选择的名片数据事件 */
    this.change.emit(ev);
  }

}
