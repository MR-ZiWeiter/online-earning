import { SwipeUploadComponent } from './modules/components/swipe-upload/swipe-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwipeEyeCareModeComponent } from './modules/components/swipe-eye-care-mode/swipe-eye-care-mode.component';
import { SwipeContextNullComponent } from './modules/components/swipe-context-null/swipe-context-null.component';
import { SwipeHeaderComponent } from './modules/components/swipe-header/swipe-header.component';
import { SwipeLottieComponent } from './modules/components/swipe-lottie/swipe-lottie.component';
import { SwipeShareComponent } from './modules/components/swipe-share/swipe-share.component';
import { SwipeInputComponent } from './modules/components/swipe-input/swipe-input.component';
import { SwipeCheckboxComponent } from './modules/components/swipe-checkbox/swipe-checkbox.component';

// API接口类服务模块
import { ApiServiceModule } from './modules/provider/api/index.module';

// 数据处理类服务
import { TabsService } from './services/tabs/tabs.service';
// import { UserService } from './services/user/user.service';

// 管道类
import { KeysPipe } from './pipes';

@NgModule({
  declarations: [
    SwipeEyeCareModeComponent,
    SwipeContextNullComponent,
    SwipeLottieComponent,
    SwipeShareComponent,
    SwipeInputComponent,
    SwipeHeaderComponent,
    SwipeUploadComponent,
    SwipeCheckboxComponent,
    /* 管道类 */
    KeysPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApiServiceModule
  ],
  providers: [
    TabsService,
    // UserService
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SwipeEyeCareModeComponent,
    SwipeContextNullComponent,
    SwipeLottieComponent,
    SwipeShareComponent,
    SwipeInputComponent,
    SwipeHeaderComponent,
    SwipeUploadComponent,
    SwipeCheckboxComponent,
    /* 管道类 */
    KeysPipe
  ]
})
export class CoreModule { }
