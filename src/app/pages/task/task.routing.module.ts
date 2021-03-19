import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskInfoPage } from './task-info/task-info.page';

const routes: Routes = [
  { path: 'task-info', component: TaskInfoPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TaskRoutingModule {}
