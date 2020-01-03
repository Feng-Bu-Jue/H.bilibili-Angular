import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { DrawListPage } from '../draw-list/draw-list';
import { AuthGuard } from 'src/app/gurad/authGuard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'draw',
        loadChildren: () => import('../draw-list/draw-list.module').then(m => m.DrawListPageModule)
      },
      {
        path: 'draw/detail/:uid',
        loadChildren: () => import('../draw-detail/draw-detail.module').then(m => m.DrawDetailPageModule),
      },
      {
        path: 'photo',
        loadChildren: () => import('../photo-list/photo-list.module').then(m => m.PhotoListPageModule),
      },
      {
        path: 'rank',
        loadChildren: () => import('../rank-list/rank-list.module').then(m => m.RankListPageModule)
      },
      {
        path: 'me',
        loadChildren: () => import('../me/me.module').then(m => m.MePageModule),
        canActivate: [AuthGuard]
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

