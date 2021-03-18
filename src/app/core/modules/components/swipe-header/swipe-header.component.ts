import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@app/env';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'swipe-header',
  templateUrl: './swipe-header.component.html',
  styleUrls: ['./swipe-header.component.scss']
})
export class SwipeHeaderComponent implements OnInit {

  public systemInfo: any = {};

  /**
   * 支持Slot插入
   * slot="left" 左侧插入
   * slot="center" 中间插入
   * slot="right" 右侧插入
   * slot="all" 全部自定义
   */
  public renderLeftIcon: string = environment.BASIC_URL + '/statics/svgs/public/min/public-min-gray-arrow@2x.svg';
  public navigationColor: string = '#000000';
  /**
  * 配置项
  * @Input customLeft {boolean} 是否自定义左侧
  * @Input leftIcon {string} 自定义左侧图标
  * @Input title {string} 标题
  * @Input customLeftEvent {Function} 自定义函数返回
  * @Input customHeader {boolean} 自定义Header组件
  * @Input customCenterStyle {string} 自定义Center样式
  * @Input customStyle {string} 自定义Header组件样式
  * @Input type {number} 1:返回 2:重定向 3:SwitchTab方式 4:跳转页面
  * @Input delta {number} 返回页面的深度
  * @Input url {string} 重定向或者SwitchTabURL或者跳转页面
  * @Input navigateColor {string} #ffffff | #000000 顶部状态栏颜色
  */
  @Input() public isBack: boolean = true;
  @Input() public customLeft: boolean = false;
  @Input()
  public set leftIcon(n: string) {
    this.renderLeftIcon = n;
  };
  public get leftIcon() {
    return this.renderLeftIcon
  }

  @Input() public title: string|null = '标题';
  /* 事件类 */
  @Input() public customLeftEvent: any;
  @Input() public customCenter: boolean = false;
  @Input() public customRight: boolean = false;
  @Input() public customHeader: boolean = false;

  @Input() public customCenterStyle: any = {};
  @Input() public customStyle: any = {};

  @Input() private type: number = 1;
  @Input() private delta: number = 1;
  @Input() private url: string = '/';

  @Input()
  private set navigateColor(n: string) {
    this.navigationColor = n;
    if (n) {
      // console.log('xx', _n)
      if (n === '#FFFFFF') {
        // 设置返回按钮的颜色
        this.renderLeftIcon = environment.BASIC_URL + '/statics/svgs/public/min/public-min-back-white-arrow@2x.svg'
      } else {
        // 设置返回按钮的颜色
        this.renderLeftIcon = environment.BASIC_URL + '/statics/svgs/public/min/public-min-gray-arrow@2x.svg'
      }
    }
  };

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  /* 方法函数 */
  public handlerLeftEvent(ev: Event|any) {
    if (this.customLeftEvent) {
      this.customLeftEvent(ev)
    } else {
      switch(this.type) {
        case 1:
          this.navController.back();
          break
        case 2:
          break
        case 3:
          break
        case 4:
          break
      }
    }
  }

}
