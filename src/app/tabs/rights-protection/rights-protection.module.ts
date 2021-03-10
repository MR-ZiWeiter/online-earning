import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightsProtectionComponent } from './rights-protection.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RightsProtectionComponent }
    ])
  ],
  declarations: [RightsProtectionComponent]
})
export class RightsProtectionModule { }
