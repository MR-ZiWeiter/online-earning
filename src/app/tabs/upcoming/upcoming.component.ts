import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, PickerController } from '@ionic/angular';
import { ApiUpcomingService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  public saloonRenderConfig = {
    buyerAccountId: '',
    pageNum: 1,
    pageSize: 20
  }

  public buysArray: any[] = []

  constructor(
    private router: Router,
    private menu: MenuController,
    private ionPickerCotroller: PickerController,
    private apiUpcomingService: ApiUpcomingService
  ) { }

  ngOnInit() {
    this.loadSaloonInfo()
  }

  private loadSaloonInfo() {
    this.apiUpcomingService.asyncFetchUpcomingList(this.saloonRenderConfig).subscribe(res => {
      console.log(res)
    })
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
    this.menu.enable(true, 'upcoming');
    this.menu.open('upcoming');
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

}
