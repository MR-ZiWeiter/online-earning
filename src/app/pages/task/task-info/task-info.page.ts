import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'swipe-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
})
export class TaskInfoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  /* 打开任务 */
  public async openStartTask() {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      swipeToClose: true,
      cssClass: 'custom-task-modal',
      backdropDismiss: true,
      componentProps: {
        step: 1
      }
    })
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data)
  }

}
