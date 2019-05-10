
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/draw', pathMatch: 'full' },
  {
    path: 'draw',
    children: [
      {
        path: '',
        loadChildren: './pages/draw-list/draw-list.module#DrawListPageModule',
      },
      {
        path: 'detail/:uid',
        loadChildren: './pages/draw-detail/draw-detail.module#DrawDetailPageModule',
      },
    ],
  },
  {
    path: 'picture',
    children: [
      {
        path: '',
        loadChildren: './pages/draw-list/draw-list.module#DrawListPageModule',
      },
      {
        path: 'detail',
        loadChildren: './pages/draw-detail/draw-detail.module#DrawDetailPageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

