import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-webview',
  templateUrl: './webview.page.html',
  styleUrls: ['./webview.page.scss'],
})
export class WebviewPage implements OnInit {

  public queryParams: any = {
    redirectUrl: null
  };

  @ViewChild('iframeElm') private iframeElm: HTMLElement;

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private domSanitizer: DomSanitizer
  ) {
    // console.log(this.activatedRoute.snapshot);
    // tslint:disable-next-line: max-line-length
    // this.domSanitizer.bypassSecurityTrustResourceUrl(decodeURIComponent(this.activatedRoute.snapshot.queryParams.redirectUrl));
    // alert(1);
    // tslint:disable-next-line: max-line-length
    this.queryParams.redirectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(decodeURIComponent(this.activatedRoute.snapshot.queryParams.redirectUrl));
    // this.iframeElm
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.queryParams.redirectUrl) {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '地址错误!',
      buttons: [
        {
          text: '返回',
          role: 'cancel',
          handler: () => {
            this.navController.back();
          }
        }
      ]
    });
    await alert.present();
  }

}
