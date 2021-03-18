import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: UserComponent }
    ])
  ],
  declarations: [UserComponent]
})
export class UserModule { }
