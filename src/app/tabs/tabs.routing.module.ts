import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'upcoming', pathMatch: 'full' },
      { path: 'upcoming', loadChildren: () => import('./upcoming/upcoming.module').then( m => m.UpcomingModule ) },
      { path: 'task', loadChildren: () => import('./task/task.module').then( m => m.TaskModule ) },
      { path: 'rights-protection',
        loadChildren: () => import('./rights-protection/rights-protection.module').then( m => m.RightsProtectionModule ) },
      { path: 'user', loadChildren: () => import('./user/user.module').then( m => m.UserModule ) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TabsPageRoutingModule {}
