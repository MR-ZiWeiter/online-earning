import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-auto-login',
  templateUrl: './auto-login.page.html',
  styleUrls: ['./auto-login.page.scss'],
})
export class AutoLoginPage implements OnInit {

  private options: any;

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    // this.activatedRoute.snapshot.params
    console.log(this.activatedRoute.snapshot.queryParams);
    this.options = this.activatedRoute.snapshot.queryParams;
  }

  ngOnInit() {
    if (this.options.token) {
      this.userService.setAppToken(this.options.token);
      if (this.options.redirectUrl) {
        if (this.options.redirectUrl.includes('https://') || this.options.redirectUrl.includes('http://')) {
          window.location.href = decodeURIComponent(this.options.redirectUrl);
        } else {
          this.navController.navigateRoot(decodeURIComponent(this.options.redirectUrl));
        }
      }
    }
  }

  public onBackEvent() {
    this.navController.navigateRoot('/');
  }

}
