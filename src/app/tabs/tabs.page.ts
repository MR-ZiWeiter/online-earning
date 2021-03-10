import { Component } from '@angular/core';
// tab页注入tabs服务 用于控制tabs内页隐藏tabbar
import { TabsService } from 'src/app/core/services/tabs/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {
  public checkedTabsName: string;

  constructor(public tabs: TabsService) {}

  tabsChange(e: any) {
    console.log(e);
    this.checkedTabsName = e.tab;
  }
}
