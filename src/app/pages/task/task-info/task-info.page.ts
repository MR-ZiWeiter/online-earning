import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'swipe-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
})
export class TaskInfoPage implements OnInit {

  public urlParams!: any;

  public renderInfo!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private apiTaskIndexService: ApiTaskIndexService
  ) {
    this.urlParams = activatedRoute.snapshot.params;
    if (this.urlParams && this.urlParams.id) {
      this.initalDetailInfo(this.urlParams.id);
    }
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
  /* 打开任务 */
  public async openStartTask() {
    this.apiTaskIndexService.asyncFetchTaskStartInfo({
      taskId: this.urlParams.id
    }).subscribe(res => {
      this.handlerTaskInfo(res.rel);
    })
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
    !data.isNextHand && data.renderInfo.success && (this.initalDetailInfo(this.urlParams.id));
  }

}
