import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-task-info-cell',
  templateUrl: './task-info-cell.component.html',
  styleUrls: ['./task-info-cell.component.scss']
})
export class TaskInfoCellComponent implements OnInit {

  @Input() public isCustomHandler: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
