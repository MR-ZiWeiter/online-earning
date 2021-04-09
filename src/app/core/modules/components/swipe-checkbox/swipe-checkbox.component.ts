import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface ICheckboxModel {
  label: string;
  isCheck: boolean;
  [x: string]: any;
}

@Component({
  selector: 'swipe-checkbox',
  templateUrl: './swipe-checkbox.component.html',
  styleUrls: ['./swipe-checkbox.component.scss']
})

export class SwipeCheckboxComponent implements OnInit {

  // public checkboxRender: any[] = [
  //   { label: '女装内衣', isCheck: false },
  //   { label: '女装内衣', isCheck: false },
  //   { label: '女装内衣', isCheck: false },
  //   { label: '女装内衣', isCheck: false },
  // ];

  @Input() public checkboxRender: ICheckboxModel[] = [];

  @Output() private checkboxRenderChange: EventEmitter<Array<ICheckboxModel>> = new EventEmitter<Array<ICheckboxModel>>();

  @Output() private checkedChange: EventEmitter<Array<ICheckboxModel>> = new EventEmitter<Array<ICheckboxModel>>();

  constructor() { }

  ngOnInit() {
  }

  public onClickChange(info: ICheckboxModel) {
    setTimeout(() => {
      const checked = this.checkboxRender.filter(fs => fs.isCheck)
      this.checkedChange.emit(checked);
    }, 300)
  }

}
