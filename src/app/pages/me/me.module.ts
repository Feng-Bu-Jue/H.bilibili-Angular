import { UserApi } from 'src/app/bilibiliApi/userApi';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/components/componetModule';
import { IonicModule } from '@ionic/angular';
import { MePage } from './me';
import { NgModule } from '@angular/core';
import { MePageRoutingModule } from './me.routing.module';
import { IconGender } from 'src/app/widgets/icon-gender/icon-gender';
import { IconLevel } from 'src/app/widgets/icon-level/icon-level';
import { MineFavoritesPage } from './me-favorites/me-favorites';
import { AppHeaderModule } from 'src/app/widgets/app-header/app-header.module';
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';

@NgModule({
  declarations: [
    MePage,
    IconGender,
    IconLevel,
    MineFavoritesPage
  ],
  imports: [
    CommonModule,
    ComponentModule,
    IonicModule,
    MePageRoutingModule,
    AppHeaderModule,
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '10px',
      threshold: 1,
      // css filter
      // loading image in placeholder. Can be URL or base64
      placeholderImageSrc:
          // tslint:disable-next-line:max-line-length
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
  }),
  ],
  providers: []
})
export class MePageModule { }
