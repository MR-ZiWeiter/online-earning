import { NgModule } from '@angular/core';
import {
  ApiUserIndexService,
  UserAccountService,
  ApiSuperVipService,
  ApiUpcomingService,
  ApiBusinessService,
  ApiSystemService,
  ApiTaskIndexService
} from './index';

@NgModule({
  imports: [],
  providers: [
    ApiUserIndexService,
    UserAccountService,
    ApiUpcomingService,
    ApiSuperVipService,
    ApiBusinessService,
    ApiSystemService,
    ApiTaskIndexService
  ]
})

export class ApiServiceModule {}
