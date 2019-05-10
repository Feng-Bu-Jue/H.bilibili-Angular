import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkDrawApi } from 'src/app/bilibiliApi/LinkDrawApi';
import { DrawDetailPage } from './draw-detail';

const routes: Routes = [
  {
    path: '',
    component: DrawDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawDetailPageRoutingModule { }
