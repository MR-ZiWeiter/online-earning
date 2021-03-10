import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LottieComponent } from './models/components/lottie/lottie.component';
import { EyeCareModeComponent } from './models/components/eye-care-mode/eye-care-mode.component';

// API接口类服务模块
import { ApiServiceModule } from './models/provider/api/index.module';


// 数据处理类服务
import { TabsService } from './services/tabs/tabs.service';
// import { UserService } from './services/user/user.service';
import { NullDataComponent } from './models/components/null-data/null-data.component';
import { ShareComponent } from './models/components/share/share.component';


@NgModule({
  declarations: [
    LottieComponent,
    EyeCareModeComponent,
    NullDataComponent,
    ShareComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiServiceModule
  ],
  providers: [
    TabsService,
    // UserService
  ],
  exports: [
    EyeCareModeComponent,
    LottieComponent,
    NullDataComponent,
    ShareComponent,
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
