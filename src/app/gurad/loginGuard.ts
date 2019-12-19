import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from '../store/user.state';
import { ToastService } from '../services/toastService';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store,
        private toastService: ToastService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.store.selectSnapshot(UserState.getToken)) {
            this.toastService.present('已经登录了呢..');
            this.router.navigateByUrl('');
        }
        return true;
    }
}