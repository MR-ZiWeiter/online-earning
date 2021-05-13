import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { CoreToolsFunction } from 'src/app/core/core.tools';
import { PickerItemModel } from './swipe-city-picker';
import city from './city.json'

@Component({
  selector: 'swipe-city-picker',
  templateUrl: './swipe-city-picker.component.html',
  styleUrls: ['./swipe-city-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwipeCityPickerComponent),
      multi: true
    }
  ]
})
export class SwipeCityPickerComponent extends CoreToolsFunction implements OnInit, ControlValueAccessor {

  public areaId: number;

  // 城市配置
  public cityArray: Array<PickerItemModel> = city;
  public cityConfig = {
    name: '请选择城市',
    value: [],
    cols: 4
  };

  // 控制器
  private valueChange: any = () => {};
  private touchChange: any = () => {};
  private disabled: boolean = false;

  // 延迟器
  private timer: any;

  // 传入数据
  @Input() public type: string;
  // tslint:disable-next-line: no-output-native
  // @Output() private valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  private set value(info: any) {
    this.areaId = info;
    if (info) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        if (this.cityArray.length !== 0) {
          this.cityConfig.value = this.handlerPickerValue(this.flatDeepTreeHandler(this.deepSearchFilterHandler(info, this.cityArray)));
          this.cityConfig.name = this.getResult(this.cityConfig.value);
          // console.log(this.orginConfig.value);
          // console.log(this.orginArray);
          clearInterval(this.timer);
        }
      }, 100);
    }
  }
  private get value() {
    return this.areaId;
  }

  @Input() public labelText = '所在区域';

  @Input() private isSign: boolean;
  constructor() {
    super();
  }
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
    this.valueChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
    this.touchChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
    this.disabled = isDisabled;
  }

  ngOnInit() {
  }

  // 回调
  public onCityOKEvent(result) {
    // console.log(result)
    this.areaId = Number(this.getResultValue(result));
    this.cityConfig.name = this.getResult(result);
    this.valueChange(this.areaId);
  }

  // 处理数据
  private handlerPickerValue(val: Array<any>) {
    const cloneArray = [];
    val.map(item => {
      cloneArray.push(this.handlerDeepAarray(this.cityArray, item.value));
    });
    return cloneArray;
  }
  // 深度查找数据
  private handlerDeepAarray(arr: any, key: string) {
    // if () {}
    // obj[key]
    // console.log(arr)
    const status = Array.isArray(arr);

    if (status) {
      let cloneObject;
      arr.some(item => {
        if (item.value === key) {
          cloneObject = item;
          return true;
        } else {
          const citem = this.handlerDeepAarray(item.children, key);
          if (citem) {
            cloneObject = citem;
          }
        }
      });
      return cloneObject;
    }
  }
  // 处理数据公共函数
  private getResultValue(result: Array<any>): string {
    return result[result.length - 1].value || result[result.length - 1].id;
  }
  // 处理数据公共函数
  private getResult(result: Array<any>): string {
    const array = [];
    let temp = '';
    result.forEach(item => {
      array.push(item.label || item);
      temp += item.label || item;
    });
    return array.map(v => v).join(',');
  }
  public onCityCancelEvent() {
    console.log('cancel');
  }
  public onOfficeCancelEvent() {
    console.log('cancel');
  }

}
