import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  public openMenuInfo() {
    this.menu.open('end');
  }

}
