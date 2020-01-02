import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DrawListTemplate } from './draw-list';
import { IImageLoaderOptions } from 'ngx-progressive-image-loader';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { RouterModule } from '@angular/router';
import { NgxWaterfallModule } from 'ngx-waterfall';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { WidgetModule } from 'src/app/widgets/widget.module';

@NgModule({
    declarations: [
        DrawListTemplate
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        NgxWaterfallModule,
        WidgetModule,
        NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
            // rootMargin must be specified in pixels or percent
            rootMargin: '10px',
            threshold: 0.1,
            // css filter
            // loading image in placeholder. Can be URL or base64
            placeholderImageSrc:
                // tslint:disable-next-line:max-line-length
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
        }),
        PipeModule
    ],
    exports: [
        DrawListTemplate
    ]
})
export class DrawListTemplateModule { }
