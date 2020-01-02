import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IconGender } from './icon-gender/icon-gender';
import { IconLevel } from './icon-level/icon-level';
import { AppHeader } from './app-header/app-header';
import { ImgViewer } from './img-viewer/img-viewer';
import { NgModule } from '@angular/core';
import { Activatable } from './activatable/activatable';

@NgModule({
    declarations: [
        ImgViewer,
        IconGender,
        IconLevel,
        AppHeader,
        Activatable
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ImgViewer,
        IconGender,
        IconLevel,
        AppHeader,
        Activatable
    ]
})
export class WidgetModule { }
