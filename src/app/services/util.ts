import { Injectable } from '@angular/core';
import { Enum_Biz } from '../bilibiliApi/models/Enum';

@Injectable({
    providedIn: 'root'
})
export class Util {

    constructor() { }

    getBizType(category: string): Enum_Biz {
        debugger
        switch (category) {
            case 'cos':
                return Enum_Biz.photo;
            case 'sifu':
                return Enum_Biz.photo;
            case 'illustration':
                return Enum_Biz.draw;
            case 'comic':
                return Enum_Biz.draw;
            default:
                return Enum_Biz.all;
        }
    }
}