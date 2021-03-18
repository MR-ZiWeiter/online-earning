import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UserRoutingModule } from './user.routing.module';
import { UserComponentModule } from './components/user.component.module';
/* 主路由出口 */
import { UserComponent } from './user.component';
/* 页面组件 */
import { MessagesPage } from './messages/messages.page';
import { FundingDetailsPage } from './funding-details/funding-details.page';
import { WithdrawalsRecordPage } from './withdrawals-record/withdrawals-record.page';
import { LatestAnnouncementPage } from './latest-announcement/latest-announcement.page';
import { ContactCustomerServicePage } from './contact-customer-service/contact-customer-service.page';
import { DataAuthenticationPage } from './data-authentication/data-authentication.page';
import { WithdrawApplicationPage } from './withdraw-application/withdraw-application.page';
import { ChangePwdPage } from './change-pwd/change-pwd.page';

@NgModule({
  imports: [
    CoreModule,
    UserRoutingModule,
    UserComponentModule
  ],
  exports: [],
  declarations: [
    UserComponent,
    MessagesPage,
    FundingDetailsPage,
    WithdrawalsRecordPage,
    LatestAnnouncementPage,
    ContactCustomerServicePage,
    DataAuthenticationPage,
    WithdrawApplicationPage,
    ChangePwdPage
  ]
})
export class UserModule { }
