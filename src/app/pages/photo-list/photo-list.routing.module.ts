import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListPage } from './photo-list';


const routes: Routes = [
  {
    path: '',
    component: PhotoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoListPageRoutingModule { }
