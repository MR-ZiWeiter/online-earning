import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IRadioModel {
  label: string;
  value: string;
  [x: string]: any;
}

@Component({
  selector: 'swipe-radio',
  templateUrl: './swipe-radio.component.html',
  styleUrls: ['./swipe-radio.component.scss']
})
export class SwipeRadioComponent implements OnInit {

  public _value!: string;

  @Input() public radioRender: IRadioModel[] = [];

  @Output() private radioRenderChange: EventEmitter<Array<IRadioModel>> = new EventEmitter<Array<IRadioModel>>();

  @Input()
  public set value(n: string) {
    this._value = n;
  }
  public get value(): string {
    return this._value;
  }

  @Output() private valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  /* 切换单选 */
  public checkRadioChange(ev: any) {
    // this._value = ev.value
    this.valueChange.emit(ev.value);
  }

}
