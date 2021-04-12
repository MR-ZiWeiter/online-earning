import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-null',
  templateUrl: './swipe-null.component.html',
  styleUrls: ['./swipe-null.component.scss']
})
export class SwipeNullComponent implements OnInit {

  @Input() public content: string = '暂无数据';

  constructor() { }

  ngOnInit() {
  }

}
