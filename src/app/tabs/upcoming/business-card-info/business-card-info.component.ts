import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'swipe-business-card-info',
  templateUrl: './business-card-info.component.html',
  styleUrls: ['./business-card-info.component.scss']
})
export class BusinessCardInfoComponent implements OnInit {

  /* 传入数据 */
  @Input() public renderInfo!: any;

  /* 上传数据 */
  @Output() private change: EventEmitter<{id: string; key: string}> = new EventEmitter<{id: string; key: string}>();

  constructor() { }

  ngOnInit() {
  }

  /* 选择名片 */
  public changeBusinessInfo() {
    /* 上传回调 */
    this.change.emit({id: this.renderInfo.id, key: this.renderInfo.nickname});
  }

}
