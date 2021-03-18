import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-withdrawals-record',
  templateUrl: './withdrawals-record.page.html',
  styleUrls: ['./withdrawals-record.page.scss'],
})
export class WithdrawalsRecordPage implements OnInit {

  public buysArray: any[] = []
  constructor() { }

  ngOnInit() {
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

}
