import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {

  public username!: string;

  constructor() { }

  ngOnInit() {
  }

}
