import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IconGender } from './icon-gender/icon-gender';
import { IconLevel } from './icon-level/icon-level';
import { AppHeader } from './app-header/app-header';
import { ImgViewer } from './img-viewer/img-viewer';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ImgViewer,
        IconGender,
        IconLevel,
        AppHeader
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ImgViewer,
        IconGender,
        IconLevel,
        AppHeader
    ]
})
export class WidgetModule { }
