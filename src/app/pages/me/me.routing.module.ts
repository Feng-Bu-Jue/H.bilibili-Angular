
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MePage } from './me';


const routes: Routes = [
  {
    path: '',
    component: MePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule { }
