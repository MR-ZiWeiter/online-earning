import { NgModule } from '@angular/core';

import { TabsPageRoutingModule } from './tabs.routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../modules/shared';
// import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    // CoreModule,
    SharedModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})

export class TabsPageModule {}
