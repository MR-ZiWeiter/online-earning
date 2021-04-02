import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TaskComponent } from './task.component';

import { PublicComponentModule } from 'src/app/pages/components/public-component.module';
@NgModule({
  imports: [
    CoreModule,
    PublicComponentModule,
    RouterModule.forChild([
      { path: '', component: TaskComponent }
    ])
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
