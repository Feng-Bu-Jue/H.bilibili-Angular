import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HtmlPipe } from './htmlPipe';
import { AvatarPipe } from './avatarPipe';

@NgModule({
    declarations: [
        HtmlPipe,
        AvatarPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        HtmlPipe,
        AvatarPipe
    ]
})
export class PipeModule { }
