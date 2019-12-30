import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { ToastController, LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loadingService';
import { async } from '@angular/core/testing';
import { ToastService } from 'src/app/services/toastService';
import { Route } from 'src/app/decoratorTest';
import { Router } from '@angular/router';

@Component({
  selector: 'page-login',
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
    private loadingService: LoadingService,
    public router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {

  }

  ngDoCheck(): void {
    let validatePassword = this.password && this.password.length > 6
    let validateUserName = this.username && this.username.length > 6

    this.isDisable = !(validateUserName && validatePassword);
  }

  async signin() {
    await this.loadingService.presentWithAction(
      "signing in",
      () => this.auhService.login(this.username, this.password)).then(() => {
        history.back();
      }).catch(error => {
        this.toastService.present(error.data.message);
      })
  }
}
