import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services/auth/auth.guard';
// canActivate: [AuthGuard]
const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'preview', loadChildren: () => import('./preview/preview.module').then( m => m.PreviewModule)},
  /* 添加名片模块 */
  { path: 'carte', canActivate: [AuthGuard], loadChildren: () => import('./carte/carte.module').then( m => m.CarteModule)},
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'task', canActivate: [AuthGuard], loadChildren: () => import('./task/task.module').then(m => m.TaskModule) }
];

const PagesRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [PagesRoutes],
  exports: [RouterModule]
})

export class PagesRoutesModule {}
