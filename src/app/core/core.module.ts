import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwipeEyeCareModeComponent } from './modules/components/swipe-eye-care-mode/swipe-eye-care-mode.component';
import { SwipeContextNullComponent } from './modules/components/swipe-context-null/swipe-context-null.component';
import { SwipeUploadComponent } from './modules/components/swipe-upload/swipe-upload.component';
import { SwipeHeaderComponent } from './modules/components/swipe-header/swipe-header.component';
import { SwipeLottieComponent } from './modules/components/swipe-lottie/swipe-lottie.component';
import { SwipeShareComponent } from './modules/components/swipe-share/swipe-share.component';
import { SwipeInputComponent } from './modules/components/swipe-input/swipe-input.component';
import { SwipeCheckboxComponent } from './modules/components/swipe-checkbox/swipe-checkbox.component';
import { SwipeRadioComponent } from './modules/components/swipe-radio/swipe-radio.component';
import { SwipeNullComponent } from './modules/components/swipe-null/swipe-null.component';
import { SwipeCityPickerComponent } from './modules/components/swipe-city-picker/swipe-city-picker.component';

// API接口类服务模块
import { ApiServiceModule } from './modules/provider/api/index.module';

// 数据处理类服务
import { TabsService } from './services/tabs/tabs.service';
// import { UserService } from './services/user/user.service';

// 管道类
import { GenderPipe, KeysPipe, PaytypePipe, PricePipe } from './pipes';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

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
    SwipeRadioComponent,
    SwipeNullComponent,
    SwipeCityPickerComponent,
    /* 管道类 */
    KeysPipe,
    GenderPipe,
    PricePipe,
    PaytypePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule,
    ReactiveFormsModule,
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
    NgZorroAntdMobileModule,
    ReactiveFormsModule,
    SwipeEyeCareModeComponent,
    SwipeContextNullComponent,
    SwipeLottieComponent,
    SwipeShareComponent,
    SwipeInputComponent,
    SwipeHeaderComponent,
    SwipeUploadComponent,
    SwipeCheckboxComponent,
    SwipeRadioComponent,
    SwipeNullComponent,
    SwipeCityPickerComponent,
    /* 管道类 */
    KeysPipe,
    GenderPipe,
    PricePipe,
    PaytypePipe
  ]
})
export class CoreModule { }
