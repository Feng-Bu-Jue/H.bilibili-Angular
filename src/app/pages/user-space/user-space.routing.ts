import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSpacePage } from './user-space';


const routes: Routes = [
  {
    path: '',
    component: UserSpacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSpacePageRoutingModule { }
