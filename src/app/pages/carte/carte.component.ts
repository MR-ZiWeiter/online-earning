import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiBusinessService } from 'src/app/core/modules/provider/api/upcoming/business.service';
import { BusinessInfoComponent } from '../components/business-info/business-info.component';
import { BusinessInfoService } from 'src/app/pages/components/business-info/business-info.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  /* 名片选择配置 */
  public _businessConfig: any;

  public nickname!: string;

  public businessConfig = {
    nickname: '',
    pageNum: 1,
    pageSize: 20
  }

  public buysArray: any[] = []

  public paltformInfo: string|number = 1;

  @ViewChild('swiperCustomMenu') private swiperCustomMenuComponent: BusinessInfoComponent;

  constructor(
    private router: Router,
    private businessInfoService: BusinessInfoService,
    private apiBusinessService: ApiBusinessService
  ) {
    this.businessInfoService.getBusinessInfoConfig().subscribe((info: any) => {
      this._businessConfig = info;
    })
  }

  ngOnInit() {
  }

  public openMenuInfo() {
    this.swiperCustomMenuComponent.openMenuInfo();
  }

  public fetchBusinessListInfo() {
    this.apiBusinessService.asyncFetchBusinessList({
      platformId: this.paltformInfo,
      ...this.businessConfig
    }).subscribe(res => {
      console.log(res)
    })

  }

  /* 选择名片后回调函数 */
  public businessChange(ev: {id: string; key: string}) {
    /* 跳转 */
    this.router.navigate(['/pages/carte/step-3', ev.id]);
  }

}
