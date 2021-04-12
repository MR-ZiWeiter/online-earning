import { Component, OnInit } from '@angular/core';
import { ApiUserIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-latest-announcement',
  templateUrl: './latest-announcement.page.html',
  styleUrls: ['./latest-announcement.page.scss'],
})
export class LatestAnnouncementPage implements OnInit {

  private renderConfig = {
    pageNum: 1,
    pageSize: 20
  }

  public renderArray: any[] = []
  constructor(
    private apiUserIndexService: ApiUserIndexService
  ) { }

  ngOnInit() {
    this.doRefresh();
  }

  public fetchRenderArray(fn?: Function, err?: Function) {
    this.apiUserIndexService.asyncFetchNoticeList(this.renderConfig).subscribe(res => {
      fn && fn(res);
    }, error => {
      err && err(error);
    })
  }

  public doRefresh(event?: any) {
    this.renderConfig.pageNum = 1;
    this.fetchRenderArray((res) => {
      this.renderArray = res.rel.list;
      event && (event.target.disabled = false);
      event && event.target.complete();
    }, () => {
      event && event.target.complete();
    })
  }

  public loadData(event: { target: { complete: () => void; disabled: boolean; }; }) {
    this.renderConfig.pageNum++;
    this.fetchRenderArray((res) => {
      event.target.complete();
      if (res.rel.count > this.renderArray.length) {
        this.renderArray = this.renderArray.concat(res.rel.list);
      } else {
        event.target.disabled = true;
        this.renderArray = this.renderArray.concat(res.rel.list);
      }
    });
  }

}
