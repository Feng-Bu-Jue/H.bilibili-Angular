
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginGuard } from './gurad/loginGuard';

const routes: Routes = [
  { path: '', redirectTo: '/app/tabs/draw', pathMatch: 'full' },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'space/:uid',
    loadChildren: () => import('./pages/user-space/user-space.module').then(m => m.UserSpacePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

