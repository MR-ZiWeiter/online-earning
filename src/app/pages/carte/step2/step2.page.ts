import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IApiBusinessInfoModel } from 'src/app/core/model';
import { ApiBusinessService } from 'src/app/core/modules/provider/api';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'swipe-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {

  private urlParams: any;
  private urlQueryParams: any;

  public remark!: string;

  public businessRenderInfo!: IApiBusinessInfoModel;

  constructor(
    private apiBusinessService: ApiBusinessService,
    private activeSnapshot: ActivatedRoute,
    private navController: NavController,
    private router: Router
  ) {
    this.urlParams = activeSnapshot.snapshot.params;
    this.urlQueryParams = activeSnapshot.snapshot.queryParams;
    // console.log(activeSnapshot);
    if (this.urlParams && this.urlParams.id !== 'none') {
      this.apiBusinessService.asyncFetchBusinessAccountInfo({
        id: this.urlParams.id
      }).subscribe(res => {
        console.log(res)
      })
    } else {
      this.apiBusinessService.asyncFetchBusinessInfo({
        platformId: 1,
        nickname: this.urlQueryParams.name
      }).subscribe(res => {
        console.log(res)
        this.businessRenderInfo = res.rel;
        this.remark = res.rel.remarks;
      })
    }
  }

  ngOnInit() {

  }

  /* 修改备注 */
  public onRemarkChange() {
    if (this.remark) {
      this.apiBusinessService.asyncPutBusinessRemarkInfo({
        id: this.businessRenderInfo.id,
        remark: this.remark
      }).subscribe();
    }
  }

  /* 返回 */
  public onNavigateBack() {
    this.navController.back();
  }

  /* 下一步 */
  public onSubmitChange() {
    this.apiBusinessService.asyncFetchBusinessAccountInfo({
      id: this.businessRenderInfo.id
    }).subscribe(res => {
      this.router.navigate(['/pages/carte/step-3', res.rel.id]);
    })
  }

}
