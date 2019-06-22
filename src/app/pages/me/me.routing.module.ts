
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MePage } from './me';
import { MineFavoritesPage } from './me-favorites/me-favorites';


const routes: Routes = [
  {
    path: '',
    component: MePage,
  },
  {
    path: 'favorites',
    component: MineFavoritesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule { }
