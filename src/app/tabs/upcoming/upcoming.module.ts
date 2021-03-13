import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingComponent } from './upcoming.component';

import { TaskInfoCellComponent } from './task-info-cell/task-info-cell.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', component: UpcomingComponent }
    ])
  ],
  declarations: [
    UpcomingComponent,
    TaskInfoCellComponent
  ]
})
export class UpcomingModule { }
