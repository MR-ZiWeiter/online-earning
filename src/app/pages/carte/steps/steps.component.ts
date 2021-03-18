import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  public stepsInfoArray: any[] = [
    {
      index: 1,
      label: '填名片'
    },
    {
      index: 2,
      label: '检测'
    },
    {
      index: 3,
      label: '领任务'
    }
  ]

  public current = 1;

  constructor() { }

  ngOnInit() {
  }

}
