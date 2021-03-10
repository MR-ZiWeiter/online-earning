import { NgModule } from '@angular/core';
import { AccountRouterModule } from './account.routing';
import { CoreModule } from 'src/app/core/core.module';

import { LoginPage } from './login/login.page';
import { AutoLoginPage } from './auto-login/auto-login.page';

@NgModule({
  imports: [
    CoreModule,
    AccountRouterModule
  ],
  exports: [
  ],
  declarations: [
    LoginPage,
    AutoLoginPage
  ]
})
export class AccountModule { }
