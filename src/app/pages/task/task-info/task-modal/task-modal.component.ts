import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'swipe-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {

  @Input() public step!: number;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  /* 关闭Modal */
  public onCloseTaskModal() {
    this.modalController.dismiss({
      step: this.step
    })
  }

}
