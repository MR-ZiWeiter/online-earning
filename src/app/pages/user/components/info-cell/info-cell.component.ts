import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-info-cell',
  templateUrl: './info-cell.component.html',
  styleUrls: ['./info-cell.component.scss']
})
export class InfoCellComponent implements OnInit {

  @Input() public renderInfo?: any = {};

  constructor() { }

  ngOnInit() {
  }

}
