import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingComponent } from './upcoming.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UpcomingComponent }
    ])
  ],
  declarations: [UpcomingComponent]
})
export class UpcomingModule { }
