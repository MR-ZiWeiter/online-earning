import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebviewPage } from './webview/webview.page';


const routes: Routes = [
  {
    path: 'webview/:type',
    component: WebviewPage,
    outlet: 'webview-popup'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewRoutingModule {}
