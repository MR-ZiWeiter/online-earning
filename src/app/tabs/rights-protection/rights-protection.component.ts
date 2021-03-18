import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PickerController, ModalController } from '@ionic/angular';
import { SubmitRightsComponent } from './submit-rights/submit-rights.component';

@Component({
  selector: 'app-rights-protection',
  templateUrl: './rights-protection.component.html',
  styleUrls: ['./rights-protection.component.scss']
})
export class RightsProtectionComponent implements OnInit {

  public buysArray: any[] = [];

  public tabConfig: any[] = [
    { label: '处理中', number: 2, value: 'action-1' },
    { label: '已完成', number: 1, value: 'action-2' }
  ];

  constructor(
    private menu: MenuController,
    private router: Router,
    private ionPickerCotroller: PickerController,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    const modal = await this.modalController.create({
      component: SubmitRightsComponent,
      cssClass: 'custom-submit-rights-component',
      swipeToClose: true,
      mode: 'ios',
      presentingElement: await this.modalController.getTop(),
      componentProps: {}
    })
    await modal.present()
    const { data } = await modal.onWillDismiss();
    console.log(data)
  }

  public doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  public loadData(event: { target: { complete: () => void; disabled: boolean; }; }) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.buysArray.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  public openMenuInfo() {
    this.menu.open('end');
  }

  public async openPlatformPickerEvent() {
    const customPicker = await this.ionPickerCotroller.create({
      columns: [
        {
          name: '选择平台',
          options: [
            {
              text: '淘宝',
              value: '1'
            }
          ]
        }
      ]
    })
    customPicker.present()
  }

  /* 打开新名片 */
  public openNewCartePage() {
    this.router.navigate(['/pages/carte/step-1'])
  }

  public segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
