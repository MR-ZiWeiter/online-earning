import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private toastController: ToastController,
  ) { }

  async presentToast(message: string, color: 'primary'|'secondary'|'tertiary'|'success'|'warning'|'danger'|'light'|'medium'|'dark' = 'danger', options: {duration?: number} = {duration: 2000}) {
    const toast = await this.toastController.create({
      message,
      color,
      ...options
    })
    toast.present();
  }

}
