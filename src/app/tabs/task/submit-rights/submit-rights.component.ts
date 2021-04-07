import { Component, Input, OnInit } from '@angular/core';
import { ApiAppealService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'app-submit-rights',
  templateUrl: './submit-rights.component.html',
  styleUrls: ['./submit-rights.component.scss']
})
export class SubmitRightsComponent implements OnInit {

  public buysArray: any[] = [];

  public _renderInfo?: any;

  public _appealTypesInfo: any[] = [];

  public appealConfig: any = {
    description: null,
    rightProtectionTypeId: null,
    screenshot: null,
    stepId: null,
    taskId: null,
    title: null
  };

  @Input()
  public set renderInfo(n: any) {
    this._renderInfo = n;
    this.appealConfig.taskId = n.id;
    this.appealConfig.title = n.title;
  }
  public get renderInfo(): any {
    return this._renderInfo;
  }

  constructor(
    private apiAppealService: ApiAppealService
  ) { }

  ngOnInit() {
    this.inttalAppealTypesInfo();
  }

  public doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  /* 获取维权类型 */
  private inttalAppealTypesInfo() {
    this.apiAppealService.asyncFetchAppealTypesList({
      pageNum: 1,
      pageSize: 20
    }).subscribe(res => {
      // console.log(res)
      this._appealTypesInfo = res.rel.map(item => {
        return {
          label: item.title,
          value: item.id
        }
      });
    })
  }

  /* 提交维权 */
  public submitAppealInfo() {
    this.apiAppealService.asyncFetchSubmitAppealInfo(this.appealConfig).subscribe(res => {
      console.log(res)
    })
  }
}
