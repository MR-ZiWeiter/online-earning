import { NgModule } from '@angular/core';
import { CarteComponent } from './carte.component';
import { CoreModule } from 'src/app/core/core.module';

import { CarteRoutesModule } from './carte.routing.module';

import { StepsComponent } from './steps/steps.component';
import { BusinessCardInfoComponent } from 'src/app/tabs/upcoming/business-card-info/business-card-info.component';
import { TaskInfoCellComponent } from 'src/app/tabs/upcoming/task-info-cell/task-info-cell.component';

import { Step3Page } from './step3/step3.page';
import { Step2Page } from './step2/step2.page';
import { Step1Page } from './step1/step1.page';
@NgModule({
  imports: [
    CoreModule,
    CarteRoutesModule
  ],
  declarations: [
    CarteComponent,
    StepsComponent,
    BusinessCardInfoComponent,
    TaskInfoCellComponent,
    Step1Page,
    Step2Page,
    Step3Page
  ]
})
export class CarteModule { }
