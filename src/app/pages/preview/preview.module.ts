import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview.routing';
import { WebviewPage } from './webview/webview.page';

@NgModule({
  imports: [
    PreviewRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [],
  providers: [],
  declarations: [
    WebviewPage
  ]
})

export class PreviewModule {}
