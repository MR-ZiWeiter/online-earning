import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IApiBusinessSaloonInfoModel } from 'src/app/core/model';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';
import { BusinessInfoService } from 'src/app/pages/components/business-info/business-info.service';
import { ToastController } from '@ionic/angular';
import { ApiResponseModel } from 'src/app/core/modules/provider/api/index.d';

@Component({
  selector: 'swipe-task-info-cell',
  templateUrl: './task-info-cell.component.html',
  styleUrls: ['./task-info-cell.component.scss']
})
export class TaskInfoCellComponent implements OnInit {

  @Input() public isCustomHandler: boolean = false;

  @Input() public renderInfo!: IApiBusinessSaloonInfoModel;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private businessInfoService: BusinessInfoService,
    private apiTaskIndexService: ApiTaskIndexService
  ) { }

  ngOnInit() {
  }

  /* 接受任务 */
  public openStartTaskInfo() {
    console.log(this.businessInfoService)
    this.apiTaskIndexService.asyncFetchTaskTakeInfo({
      buyerId: this.businessInfoService._businessInfoConfig.selected,
      taskId: this.renderInfo.id
    }).subscribe(async (res: ApiResponseModel) => {
      // console.log(res);
      const toast = await this.toastController.create({
        duration: 2000,
        message: '领取任务成功',
        color: 'success'
      })
      await toast.present();
      await this.router.navigate(['/pages/task/task-info', this.renderInfo.id])
    })
  }

}
