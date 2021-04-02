import { NgModule } from '@angular/core';
import { CarteComponent } from './carte.component';
import { CoreModule } from 'src/app/core/core.module';
/* 公共模块 */
import { PublicComponentModule } from '../components/public-component.module';

import { CarteRoutesModule } from './carte.routing.module';

import { StepsComponent } from './steps/steps.component';

import { Step3Page } from './step3/step3.page';
import { Step2Page } from './step2/step2.page';
import { Step1Page } from './step1/step1.page';
@NgModule({
  imports: [
    CoreModule,
    PublicComponentModule,
    CarteRoutesModule
  ],
  declarations: [
    CarteComponent,
    StepsComponent,
    Step1Page,
    Step2Page,
    Step3Page
  ]
})
export class CarteModule { }
