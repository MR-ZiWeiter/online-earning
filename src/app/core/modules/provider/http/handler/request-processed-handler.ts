import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { throwError, of } from 'rxjs';
// 鉴权服务
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class RequestProcessedHandler {

  constructor(
    private toastController: ToastController,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  handle(req: HttpResponse<any>): any {
    this.loadingController.getTop().then((load: any) => {
      load && this.loadingController.dismiss();
    })
    // this.loadingController.dismiss();
    // return req;
    if (req.body && req.body.reCode === 'SUCCESS') {
      console.log('成功请求...');
      return req;
    } else if (req.body && req.body.reCode) {
      console.log((req.body.reCode).toUpperCase())
      switch ((req.body.reCode).toUpperCase()) {
        case 'TOKEN_NOT_EXISTS':
        case 'ACCESS_TOKEN_INVALID':
          this.presentToast('登录失效');
          localStorage.removeItem('wxAppToken');
          this.authService.isWeChatOrH5Login();
          throw {msg: req.body.reMsg};
        /* TOKEN 过期重新拉取TOKEN */
        case 'TOKEN_EXPIRE':
          this.authService.refreshToken();
          throw {msg: req.body.reMsg};
        case 'X1021':
          this.presentToast(req.body.reMsg);
          throw {msg: req.body.reMsg};
        case 'X':
          throw {msg: req.body.reMsg};
      }
      console.log('失败请求...');
      this.presentToast(req.body.reMsg);
      // return throwError(new Error(req.body.reMsg));
      throw {msg: req.body.reMsg};
    } else {
      localStorage.removeItem('token');
      throw {msg: '请求错误'};
    }
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }
}
