import { NgModule } from '@angular/core';
import {
  ApiUserIndexService,
  UserAccountService,
  ApiUpcomingService,
  ApiBusinessService,
  ApiSystemService,
  ApiTaskIndexService,
  ApiAppealService
} from './index';

@NgModule({
  imports: [],
  providers: [
    ApiUserIndexService,
    UserAccountService,
    ApiUpcomingService,
    ApiBusinessService,
    ApiSystemService,
    ApiTaskIndexService,
    ApiAppealService
  ]
})

export class ApiServiceModule {}
