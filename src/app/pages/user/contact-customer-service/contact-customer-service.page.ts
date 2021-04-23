import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-contact-customer-service',
  templateUrl: './contact-customer-service.page.html',
  styleUrls: ['./contact-customer-service.page.scss'],
})
export class ContactCustomerServicePage implements OnInit {

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
  public loadData(event: any) {
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
