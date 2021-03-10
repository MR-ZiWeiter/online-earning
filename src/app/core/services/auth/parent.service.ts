import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ParentService {

  private $isParentOk: Subject<string> = new Subject<string>();

  constructor() {}

  public getIsParentOk(): Observable<string> {
    return this.$isParentOk.asObservable();
  }

  public setIsParentOk(stats: string) {
    this.$isParentOk.next(stats);
  }
}
