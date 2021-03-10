import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from './../index.d';

@Injectable()

export class ApiListenService {
  constructor(private http: HttpService) {}

  public asyncListenIndexInfo(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/home/audio', info).subscribe((res: ApiResponseModel) => {
        console.log(res);
        observer.next(res.rel);
      });
    });
  }
}
