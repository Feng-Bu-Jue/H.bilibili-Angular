import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit, DoCheck {

  public isDisable: boolean = true;
  public onPasswordInput: boolean = false;
  public username: string;
  public password: string;

  constructor(
    private auhService: AuthService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

  }

  ngDoCheck(): void {
    let validatePassword = this.password && this.password.length > 6
    let validateUserName = this.username && this.username.length > 6

    this.isDisable = !(validateUserName && validatePassword);
  }

  async login() {
    const loading = await this.loadingController.create({
      message: '登录中请稍后',
    });
    await loading.present()

    await this.auhService.login(this.username, this.password).then(() => {
      loading.dismiss();
      history.back;
    }).catch(async error => {
      loading.dismiss();
      const toast = await this.toastController.create({
        message: error.message,
        position: 'bottom',
        duration: 1500
      });
      toast.present();
    });
  }

}
