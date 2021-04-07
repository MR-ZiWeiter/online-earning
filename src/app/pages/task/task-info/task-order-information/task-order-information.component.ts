import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'swipe-task-order-information',
  templateUrl: './task-order-information.component.html',
  styleUrls: ['./task-order-information.component.scss'],
})
export class TaskOrderInformationComponent implements OnInit {

  public submitTaskForm: any = {
    imagesVos: [{
      example: 2,
      image: '',
      sort: 1
    }],
    orderNo: null,
    paidAmount: null
  };

  @Input() public isLast?: boolean;
  @Output() private taskForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  //* 数据回调 */
  // taskForm
  public taskFormChange() {
    this.taskForm.emit(this.submitTaskForm);
  }

}
