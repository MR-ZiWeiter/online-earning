import { CoreModule } from 'src/app/core/core.module';
import { NgModule } from "@angular/core";
/* 导入组件模块 */
import { BusinessInfoComponent } from './business-info/business-info.component';
import { BusinessCardInfoComponent } from 'src/app/pages/components/business-card-info/business-card-info.component';
import { TaskInfoCellComponent } from 'src/app/tabs/upcoming/task-info-cell/task-info-cell.component';

@NgModule({
  imports: [
    CoreModule
  ],
  exports: [
    BusinessInfoComponent,
    BusinessCardInfoComponent,
    TaskInfoCellComponent
  ],
  declarations: [
    BusinessInfoComponent,
    BusinessCardInfoComponent,
    TaskInfoCellComponent
  ]
})

export class PublicComponentModule {}
