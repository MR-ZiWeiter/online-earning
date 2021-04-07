import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-task-order',
  templateUrl: './task-order.component.html',
  styleUrls: ['./task-order.component.scss'],
})
export class TaskOrderComponent implements OnInit {

  @Input() public renderInfo!: any;

  constructor() { }

  ngOnInit() {}

}
