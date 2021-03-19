import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TaskRoutingModule } from './task.routing.module';
import { TaskInfoPage } from './task-info/task-info.page';
import { TaskComponent } from './task.component';

/* 组件 */
import { TaskOrderComponent } from './task-info/task-order/task-order.component';
import { TaskCardComponent } from './task-info/task-card/task-card.component';
import { TaskOrderInformationComponent } from './task-info/task-order-information/task-order-information.component';
import { TaskModalComponent } from './task-info/task-modal/task-modal.component';

@NgModule({
  imports: [
    CoreModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskComponent,
    TaskInfoPage,
    TaskCardComponent,
    TaskOrderComponent,
    TaskOrderInformationComponent,
    TaskModalComponent
  ]
})
export class TaskModule { }
