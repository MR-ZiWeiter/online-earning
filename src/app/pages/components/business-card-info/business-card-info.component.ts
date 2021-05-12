import { Router } from '@angular/router';
import { ApiBusinessService } from 'src/app/core/modules/provider/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertOptions } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { SystemService } from 'src/app/core/services/system/system.service';

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
  /* 刷新回调 */
  @Output() private refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private systemService: SystemService,
    private alertController: AlertController,
    private apiBusinessService: ApiBusinessService
  ) { }

  ngOnInit() {
  }

  /* 选择名片 */
  public changeBusinessInfo(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    /* 上传回调 */
    this.change.emit({id: this.renderInfo.id, key: this.renderInfo.nickname});
  }

  /* 查看资料 */
  public onOpenBusinessInfo(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.router.navigate(['/pages/carte/step-2', this.renderInfo.id]);
  }

  /* 删除 */
  public onDeleteInfo(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.openConfirmLog({
      header: '提示',
      message: `是否删除${this.renderInfo.nickname}?`,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            // console.log('Confirm Okay');
            this.apiBusinessService.asyncPutBusinessDeleteInfo(this.renderInfo.id).subscribe(res => {
              this.systemService.presentToast('删除成功', 'success');
              this.refresh.emit(true);
            })
          }
        }
      ]
    })
  }

  /* 备注 */
  public onOpenRemarkInfo(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.openConfirmLog({
      header: '备注',
      inputs: [
        {
          name: 'remark',
          type: 'text',
          value: '',
          placeholder: '请输入您的备注'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确认',
          handler: (e: any) => {
            // console.log(e)
            // console.log('Confirm Ok');
            this.apiBusinessService.asyncPutBusinessRemarkInfo({
              id: this.renderInfo.id,
              remark: e.remark
            }).subscribe();
          }
        }
      ]
    })
  }

  /* 查单 */
  public onOpenTaskInfo(e: MouseEvent) {
    this.changeBusinessInfo(e);
    this.router.navigate(['/tabs/task']);
  }

  /* 接单 */
  public onOpenBusiness(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.router.navigate(['/pages/carte/step-3', this.renderInfo.id]);
  }

  /*  */

  /* 弹窗 */
  private async openConfirmLog(options: any) {
    const alert = await this.alertController.create({
      ...options
    })
    alert.present();
  }

}
