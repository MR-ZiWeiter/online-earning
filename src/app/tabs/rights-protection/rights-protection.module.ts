import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RightsProtectionComponent } from './rights-protection.component';
import { BusinessCardInfoComponent } from '../../pages/components/business-card-info/business-card-info.component';
import { TaskInfoCellComponent } from '../upcoming/task-info-cell/task-info-cell.component';

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: RightsProtectionComponent }
    ])
  ],
  declarations: [
    RightsProtectionComponent,
    TaskInfoCellComponent,
    BusinessCardInfoComponent
  ]
})
export class RightsProtectionModule { }
