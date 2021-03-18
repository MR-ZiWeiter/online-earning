import { NgModule } from "@angular/core";
import { CoreModule } from 'src/app/core/core.module';
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { InfoCellComponent } from "./info-cell/info-cell.component";

@NgModule({
  imports: [
    CoreModule
  ],
  exports: [InfoCellComponent, ContactInfoComponent],
  declarations: [InfoCellComponent, ContactInfoComponent]
})

export class UserComponentModule {}
