import { Component, OnInit } from '@angular/core';
import { MenuController, PickerController } from '@ionic/angular';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {
  public buysArray: any[] = []

  constructor(
    private menu: MenuController,
    private ionPickerCotroller: PickerController
  ) { }

  ngOnInit() {
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

}