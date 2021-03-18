import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-rights',
  templateUrl: './submit-rights.component.html',
  styleUrls: ['./submit-rights.component.scss']
})
export class SubmitRightsComponent implements OnInit {

  public buysArray: any[] = [];

  constructor(
  ) { }

  ngOnInit() {
  }

  public doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
