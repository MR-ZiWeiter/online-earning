import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TaskComponent } from './task.component';

import { PublicComponentModule } from 'src/app/pages/components/public-component.module';
import { SubmitRightsComponent } from './submit-rights/submit-rights.component';
@NgModule({
  imports: [
    CoreModule,
    PublicComponentModule,
    RouterModule.forChild([
      { path: '', component: TaskComponent }
    ])
  ],
  declarations: [
    TaskComponent,
    SubmitRightsComponent
  ]
})
export class TaskModule { }
