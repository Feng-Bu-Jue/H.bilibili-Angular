import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawListPage } from './draw-list';


const routes: Routes = [
  {
    path: '',
    component: DrawListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawListPageRoutingModule { }
