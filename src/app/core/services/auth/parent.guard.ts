import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

// 家长验证组件
import { ParentVerificationComponent } from 'src/app/pages/player/components/parent-verification/parent-verification.component';
import { ParentService } from './parent.service';

@Injectable({
  providedIn: 'root'
})

export class ParentGuard implements CanActivate {

  constructor(
    private router: Router,
    private parentService: ParentService,
    private modalController: ModalController
  ) {
    this.parentService.getIsParentOk().subscribe((url) => {
      if (url) {
        localStorage.setItem('isOK', 'true');
        this.router.navigate([url]);
      }
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;

    return this.handlerParentEvent(url);
  }

  private handlerParentEvent(url: string): boolean {
    const isOK = localStorage.getItem('isOK');
    if (!isOK) {
      this.parentPresentModal();
      return false;
    } else {
      localStorage.removeItem('isOK');
      return true;
    }
  }

  // 设置儿童拦截 家长验证
  // 家长验证弹窗提示
  async parentPresentModal() {
    const modal = await this.modalController.create({
      component: ParentVerificationComponent,
      cssClass: 'vip-modal-custom',
      swipeToClose: false,
      componentProps: {
        redirectUrl: '/pages/setting'
      }
      // showBackdrop: false,
    });
    return await modal.present();
  }
}
