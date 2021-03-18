import { Component, Input, OnInit } from '@angular/core';
import { CoreToolsFunction } from 'src/app/core/core.tools';

@Component({
  selector: 'swipe-upload',
  templateUrl: './swipe-upload.component.html',
  styleUrls: ['./swipe-upload.component.scss']
})
export class SwipeUploadComponent implements OnInit {

  public coreTools: CoreToolsFunction = new CoreToolsFunction();

  @Input() public isLock: boolean = false;

  @Input() public size: any[] = [150, 150];

  constructor() { }

  ngOnInit() {
  }

}
