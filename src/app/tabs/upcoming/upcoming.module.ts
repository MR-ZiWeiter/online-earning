import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UpcomingComponent } from './upcoming.component';

import { PublicComponentModule } from 'src/app/pages/components/public-component.module';

@NgModule({
  imports: [
    CoreModule,
    PublicComponentModule,
    RouterModule.forChild([
      { path: '', component: UpcomingComponent }
    ])
  ],
  declarations: [
    UpcomingComponent
  ]
})
export class UpcomingModule { }
