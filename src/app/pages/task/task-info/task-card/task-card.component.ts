import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {

  @Input() public renderInfo!: any;

  constructor() { }

  ngOnInit() {}

}
