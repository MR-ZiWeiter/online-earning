import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiBusinessService } from 'src/app/core/modules/provider/api';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'swipe-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {

  public username!: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private apiBusinessService: ApiBusinessService
  ) { }

  ngOnInit() {
  }

  public async parsingBusinessInfo() {
    // this.apiBusinessService.asyncFetchBusinessInfo({nickname: this.username}).subscribe(res => {
    // console.log(res)
    if (!this.username) {
      const toast = await this.toastController.create({
        message: '请输入名片ID',
        duration: 2000,
        color: 'danger'
      })
      await toast.present();
      return false;
    }
    this.router.navigate(['/pages/carte/step-2', 'none'], {queryParams: {name: this.username}})
    // })
  }

}
