import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {

  public username!: string;

  constructor() { }

  ngOnInit() {
  }

}
