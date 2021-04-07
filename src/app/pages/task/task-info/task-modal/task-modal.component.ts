import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {

  public submitTaskForm: any = {
    imagesVos: [{
      example: 2,
      image: '',
      sort: 1
    }],
    orderNo: null,
    paidAmount: null,
    sort: null,
    stepId: null,
    taskId: null
  };

  public _renderInfo!: any;

  @Input() private set renderInfo(n: any) {
    this._renderInfo = n;
    this.submitTaskForm.sort = n.sort
    this.submitTaskForm.stepId = n.id
    this.submitTaskForm.taskId = n.taskId
  }

  @Input() public isLast: boolean;

  constructor(
    private apiTaskIndexService: ApiTaskIndexService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  /* toast */
  private async toastShow(message: string, color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark" = "success", duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: duration
    })
    await toast.present();
  }

  /* 下一步 */
  public nextStepChange() {
    this.apiTaskIndexService.asyncFetchTaskSubmitInfo(this.submitTaskForm).subscribe(res => {
      // console.log(res);
      if (res.rel.status === 2) {
        this.onCloseTaskModal(true, res.rel);
      } else if (res.rel.status === 3) {
        this.toastShow("任务完成!");
        this.onCloseTaskModal(false, {success: true});
      } else if (res.rel.status === 4) {
        this.toastShow("任务已过期!", 'danger');
      } else if (res.rel.status === 4) {
        this.toastShow("任务已锁定!", 'danger');
      }
    })
  }

  /* 关闭Modal */
  public onCloseTaskModal(isNextHand?: boolean, renderInfo?: any) {
    this.modalController.dismiss({
      renderInfo,
      isNextHand
    })
  }

  /* 处理数据 */
  public taskFormChange(ev: any) {
    // console.log(ev)/
    this.submitTaskForm = Object.assign({}, this.submitTaskForm, ev);
  }

}
