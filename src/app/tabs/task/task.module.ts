import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TaskComponent } from './task.component';

import { TaskInfoCellComponent } from '../upcoming/task-info-cell/task-info-cell.component';
import { BusinessCardInfoComponent } from '../upcoming/business-card-info/business-card-info.component';
@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: TaskComponent }
    ])
  ],
  declarations: [TaskComponent, TaskInfoCellComponent, BusinessCardInfoComponent]
})
export class TaskModule { }
