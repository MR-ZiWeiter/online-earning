import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services/auth/auth.guard';
// canActivate: [AuthGuard]
const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'preview', loadChildren: () => import('./preview/preview.module').then( m => m.PreviewModule)}
];

const PagesRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [PagesRoutes],
  exports: [RouterModule]
})

export class PagesRoutesModule {}
