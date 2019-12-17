import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankListPage } from './rank-list';


const routes: Routes = [
  {
    path: '',
    component: RankListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankListPageRoutingModule { }
