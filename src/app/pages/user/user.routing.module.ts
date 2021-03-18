import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 页面导入 */
import { MessagesPage } from './messages/messages.page';
import { FundingDetailsPage } from './funding-details/funding-details.page';
import { LatestAnnouncementPage } from './latest-announcement/latest-announcement.page';
import { ContactCustomerServicePage } from './contact-customer-service/contact-customer-service.page';
import { DataAuthenticationPage } from './data-authentication/data-authentication.page';
import { WithdrawApplicationPage } from './withdraw-application/withdraw-application.page';
import { ChangePwdPage } from './change-pwd/change-pwd.page';

const routes: Routes = [
  { path: 'messages', component: MessagesPage },
  { path: 'funding-details', component: FundingDetailsPage },
  { path: 'withdrawals-record', component: FundingDetailsPage },
  { path: 'latest-announcement', component: LatestAnnouncementPage },
  { path: 'contact-customer-service', component: ContactCustomerServicePage },
  { path: 'data-authentication', component: DataAuthenticationPage },
  { path: 'withdraw-application', component: WithdrawApplicationPage },
  { path: 'change-pwd', component: ChangePwdPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
