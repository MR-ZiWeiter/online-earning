import { NgModule } from '@angular/core';
import { AccountRouterModule } from './account.routing';
import { CoreModule } from 'src/app/core/core.module';

import { LoginPage } from './login/login.page';
import { AutoLoginPage } from './auto-login/auto-login.page';
import { RegisterPage } from './register/register.page';
import { ForgotPwdPage } from './forgot-pwd/forgot-pwd.page';

@NgModule({
  imports: [
    CoreModule,
    AccountRouterModule
  ],
  exports: [
  ],
  declarations: [
    LoginPage,
    AutoLoginPage,
    RegisterPage,
    ForgotPwdPage
  ]
})
export class AccountModule { }
