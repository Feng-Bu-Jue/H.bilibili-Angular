import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { DrawListPage } from '../draw-list/draw-list';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'draw',
        children: [
          {
            path: '',
            component: DrawListPage,
          },
          {
            path: 'detail/:uid',
            loadChildren: './pages/draw-detail/draw-detail.module#DrawDetailPageModule',
          },
        ]
      },
      {
        path: 'photo',
        children: [
          {
            path: '',
            loadChildren: './pages/photo-list/photo-list.module#PhotoListPageModule',
          },
          {
            path: 'detail/:uid',
            loadChildren: './pages/draw-detail/draw-detail.module#DrawDetailPageModule',
          },
        ]
      },
      {
        path: 'rank',
        children: [
          {
            path: '',
            loadChildren: '../map/map.module#MapModule'
          }
        ]
      },
      {
        path: 'me',
        children: [
          {
            path: '',
            loadChildren: '../about/about.module#AboutModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/draw',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

