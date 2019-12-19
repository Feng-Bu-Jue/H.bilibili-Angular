import { AuthGuard } from './authGuard';
import { NgModule } from '@angular/core';
import { LoginGuard } from './loginGuard';

@NgModule({
    providers: [
        AuthGuard,
        LoginGuard
    ],
    imports: []
})
export class GuardModule { }