import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 公共组件 */
import { CarteComponent } from './carte.component';
/* 页面 */
import { Step1Page } from './step1/step1.page';
import { Step2Page } from './step2/step2.page';
import { Step3Page } from './step3/step3.page';

const routes: Routes = [
  {
    path: '',
    component: CarteComponent,
    children: [
      { path: '', redirectTo: 'step-1' },
      { path: 'step-1', component: Step1Page },
      { path: 'step-2/:id', component: Step2Page },
      { path: 'step-3/:id', component: Step3Page }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class CarteRoutesModule {}
