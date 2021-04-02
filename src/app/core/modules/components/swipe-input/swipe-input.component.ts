import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'swipe-input',
  templateUrl: './swipe-input.component.html',
  styleUrls: ['./swipe-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwipeInputComponent),
      multi: true
    }
  ]
})
export class SwipeInputComponent implements ControlValueAccessor, OnInit {

  public value!: string|number;
  public disabled: boolean = false;
  valueChange: any = () => {};
  valueTouch: any = () => {};

  public isFocus: boolean = false;
  public isPass: boolean = false;

  @Output() private onBlur: EventEmitter<string|number> = new EventEmitter<string|number>();
  @Output() private onFocus: EventEmitter<string|number> = new EventEmitter<string|number>();

  /* @Input 传入 */
  @Input() public name: string = 'custom';
  @Input() public placeholder!: string;
  @Input() public type!: string;
  @Input() public pattern!: RegExp;
  @Input() public isRequired: boolean = false;
  @Input() public isBorder: boolean = true;

  @Input() public isPrefix: boolean = false;
  @Input() public isSuffix: boolean = false;
  @Input() public isClear: boolean = false;
  @Input() public maxLength: number;
  @Input() public minLength: number;

  constructor() { }
  writeValue(obj: any): void {
    this.value = obj;
    // console.log('FN-CHANGE');
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.valueChange = fn;
    // console.log('FN-ONCHANGE');
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    this.valueTouch = fn;
    // console.log('FN-ONTOUCH');
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // console.log('FN-Disabled');
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

  /* 输入框双向绑定回传 */
  public inputChange(info: string|number) {
    /* 通过传入的正则校验 */
    this.isPass = this.inputRexgEvent();
    /* 传出数据 */
    this.valueChange(info);
    /* 判断当类型为Number时长度截取无效问题 */
    if (this.type === 'number' && this.maxLength) {
      const getSliceValue = info.toString().slice(0, this.maxLength)
      this.value = getSliceValue
      this.valueChange(getSliceValue)
      console.log(this.value)
    }
  }

  /* Input框验证 */
  public inputRexgEvent() {
    const regexp = new RegExp(this.pattern);
    if (regexp.test(this.value.toString())) {
      if (this.value) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  /* 事件回调 */
  public inputFocusChange(ev: InputEvent) {
    this.isFocus = true;
    this.onFocus.emit(this.value);
  }
  public inputBlurChange(ev: InputEvent) {
    this.isFocus = false;
    this.onBlur.emit(this.value);
  }
  public clearInputEvent(ev: InputEvent) {
    this.value = null;
    this.isPass = false;
    this.valueChange(null);
  }

}
