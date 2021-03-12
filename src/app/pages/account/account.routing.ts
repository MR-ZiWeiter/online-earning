import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// 鉴权路由拦截
// import { AuthGuard } from 'src/app/core/services/auth/auth.guard';

import { LoginPage } from './login/login.page';
import { AutoLoginPage } from './auto-login/auto-login.page';
import { RegisterPage } from './register/register.page';
import { ForgotPwdPage } from './forgot-pwd/forgot-pwd.page';

const routes: Routes = [
  { path: 'login',  component: LoginPage},
  { path: 'auto-login', component: AutoLoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot-pwd', component: ForgotPwdPage },
];

const AccountRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [AccountRoutes],
  exports: [RouterModule]
})


export class AccountRouterModule {}
