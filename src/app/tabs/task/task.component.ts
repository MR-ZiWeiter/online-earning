import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessInfoComponent } from 'src/app/pages/components/business-info/business-info.component';
import { BusinessInfoService } from 'src/app/pages/components/business-info/business-info.service';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { SubmitRightsComponent } from './submit-rights/submit-rights.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  /* 名片选择配置 */
  public businessConfig: any;

  public taskRenderConfig: any = {
    buyerId: null,
    pageNum: 1,
    pageSize: 20,
    status: 1
  };

  public taskRenderList: any[] = [];

  public tabConfig: any[] = [
    { label: '未开始', number: 0, value: 1 },
    { label: '进行中', number: 0, value: 2 },
    { label: '待核对', number: 0, value: 3 },
    { label: '已完成', number: 0, value: 6 },
    { label: '已取消', number: 0, value: 4 }
  ];

  @ViewChild('swiperCustomMenu') private swiperCustomMenuComponent: BusinessInfoComponent;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
    private apiTaskIndexService: ApiTaskIndexService,
    private businessInfoService: BusinessInfoService
  ) {}

  ngOnInit() {
    this.businessInfoService.getBusinessInfoConfig().subscribe(info => {
      // console.log(res)
      this.businessConfig = info;
      /* 处理名片映射 */
      if (info && info.selected) {
        this.taskRenderConfig.buyerId = info.selected;
        this.doRefresh();
      }
    })
  }

  /* 任务统计 */
  private fetchTaskTotalInfo(buyerId: string) {
    if (buyerId) {
      this.apiTaskIndexService.asyncFetchTaskStatistic({
        buyerId
      }).subscribe(res => {
        console.log(res);
        this.tabConfig = res.rel.map(item => {
          return {
            label: item.statusLabel,
            number: item.amount,
            value: item.status
          }
        })
      })
    } else {
      this.presentToast('请先选择名片后再试!', 'danger');
    }
  }

  private async onTaskListInfo(fn?: Function, fn2?: Function) {
    if (!this.taskRenderConfig.buyerId) {
      this.presentToast('请先选择名片后再试!', 'danger');
      fn2 && fn2();
      return false;
    }
    this.apiTaskIndexService.asyncFetchTaskListInfo(this.taskRenderConfig).subscribe(res => {
      // console.log(res);
      fn && fn(res);
    })
  }

  public doRefresh(event?: any) {
    this.taskRenderConfig.pageNum = 1;
    this.fetchTaskTotalInfo(this.taskRenderConfig.buyerId);
    this.onTaskListInfo((res) => {
      this.taskRenderList = res.rel.list;
      if (res.rel.count === this.taskRenderConfig.pageSize) {
        event && (event.target.disabled = false);
      } else {
        event && (event.target.disabled = false);
      }
      event && event.target.complete();
    }, () => {
      event && event.target.complete();
    })
  }

  public loadData(event: any) {
    this.taskRenderConfig.pageNum++;
    this.onTaskListInfo((res) => {
      event.target.complete();
      if (this.taskRenderConfig.pageSize * (this.taskRenderConfig.pageNum - 1) > this.taskRenderList.length) {
        this.taskRenderList = this.taskRenderList.concat(res.rel.list);
        event.target.disabled = true;
      } else {
        this.taskRenderList = res.rel.list;
      }
    });
  }

  /* 打开侧栏菜单 */
  public openMenuInfo() {
    this.swiperCustomMenuComponent.openMenuInfo();
  }

  /* 打开新名片 */
  public openNewCartePage() {
    this.router.navigate(['/pages/carte/step-1'])
  }

  /* 打开任务详情 */
  public openTaskInfoPage(info: any) {
    this.router.navigate(['/pages/task/task-info', info.id])
  }

  public segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.doRefresh();
  }

  /* 名片回调 */
  public businessChange(ev: {id: string; key: string}) {
    this.doRefresh();
  }

  /* 打开维权 */
  public async openRightsModal(renderInfo?: any) {
    const modal = await this.modalController.create({
      component: SubmitRightsComponent,
      cssClass: 'custom-submit-rights-component',
      swipeToClose: true,
      mode: 'ios',
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        renderInfo
      }
    })
    await modal.present()
    const { data } = await modal.onWillDismiss();
    console.log(data)
  }

  /* 取消任务 */
  public async openCancelConfirm(info: any) {
    const alert = await this.alertController.create({
      header: '提示',
      message: `是否取消<strong>${info.taskCode}</strong>任务`,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          role: 'confirm'
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
    if (role === 'confirm') {
      this.apiTaskIndexService.asyncFetchTaskCancel({
        taskId: info.id
      }).subscribe(res => {
        this.presentToast('取消成功！', 'success');
        this.doRefresh();
      })
    }
  }

  // 提示吐司
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      color,
      message,
      duration: 2000
    });
    toast.present();
  }

}
