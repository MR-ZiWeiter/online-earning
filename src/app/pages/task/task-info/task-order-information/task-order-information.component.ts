import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'swipe-task-order-information',
  templateUrl: './task-order-information.component.html',
  styleUrls: ['./task-order-information.component.scss'],
})
export class TaskOrderInformationComponent implements OnInit {

  public imagesVos: any[] = [];

  public submitTaskForm: any = {
    imagesVos: [],
    orderNo: null,
    paidAmount: null
  };

  @Input() public renderInfo: any = {};

  @Input() public isLast?: boolean;
  @Output() private taskForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  //* 数据回调 */
  // taskForm
  public taskFormChange() {
    this.taskForm.emit(this.submitTaskForm);
  }

  /* 上传文件 */
  public imagesVosChange() {
    // console.log(this.imagesVos)
    this.submitTaskForm.imagesVos = this.imagesVos.map((item, index) => {
      return {
        example: 2,
        image: item,
        sort: index
      }
    })
    this.taskFormChange();
  }

}
