import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';
import { TaskModalComponent } from './task-modal/task-modal.component';
/* 导入名片服务 */
import { BusinessInfoService } from '../../components/business-info/business-info.service';

@Component({
  selector: 'swipe-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
})
export class TaskInfoPage implements OnInit, OnDestroy {

  public urlParams!: any;

  public renderInfo!: any;

  public businessInfo: any = {};
  /* 订阅的名字 */x
  private businessInfoServiceSubscribe?: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private businessInfoService: BusinessInfoService,
    private modalController: ModalController,
    private apiTaskIndexService: ApiTaskIndexService
  ) {
    this.urlParams = activatedRoute.snapshot.params;
    if (this.urlParams && this.urlParams.id) {
      this.initalDetailInfo(this.urlParams.id);
    }
    this.businessInfoServiceSubscribe = this.businessInfoService.getBusinessInfoConfig().subscribe(info => {
      if (info && info.selected) {
        this.businessInfo = info;
      }
    })
  }

  ngOnInit() {
  }
  /* 任务详情 */
  public initalDetailInfo(id: string) {
    this.apiTaskIndexService.asyncFetchTaskDetailInfo({
      taskId: id
    }).subscribe(res => {
      // console.log(res);
      this.renderInfo = res.rel;
    })
  }

  /* 接受任务 */
  public openStartTaskInfo(fn?: Function) {
    if (!this.businessInfo.selected) {
      this.router.navigate(['/tabs/upcoming']);
      return false;
    }
    this.apiTaskIndexService.asyncFetchTaskTakeInfo({
      buyerId: this.businessInfo.selected,
      taskId: this.renderInfo.id
    }).subscribe((res) => {
      fn && fn(res);
    })
  }

  /* 打开任务 */
  public async openStartTask() {
    /* 判断是否是取消的任务 */
    if (this.renderInfo.status === 0) {
      this.openStartTaskInfo(() => {
        this.apiTaskIndexService.asyncFetchTaskStartInfo({
          taskId: this.urlParams.id
        }).subscribe(res => {
          this.handlerTaskInfo(res.rel);
        })
      })
    } else {
      this.apiTaskIndexService.asyncFetchTaskStartInfo({
        taskId: this.urlParams.id
      }).subscribe(res => {
        this.handlerTaskInfo(res.rel);
      })
    }
  }

  /* 处理数据 */
  private handlerTaskInfo(renderInfo?: any) {
    const taskArrayInfo = renderInfo.taskStepVos.map((item: any) => {item.taskId=this.urlParams.id;return item});
    this.openTaskModal(taskArrayInfo[renderInfo.sort], taskArrayInfo.length - 1 === renderInfo.sort);
  }

  /* 处理弹窗 以及 下一步 */
  private async openTaskModal(renderInfo: any, isLast?: boolean) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      swipeToClose: true,
      cssClass: 'custom-task-modal',
      backdropDismiss: true,
      componentProps: {
        renderInfo,
        isLast
      }
    })
    await modal.present();
    const { data } = await modal.onDidDismiss();
    // console.log(data)
    data.isNextHand && this.handlerTaskInfo(data.renderInfo);
    !data.isNextHand && data.renderInfo && data.renderInfo.success && (this.initalDetailInfo(this.urlParams.id));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.businessInfoServiceSubscribe.unsubscribe();
  }

}
