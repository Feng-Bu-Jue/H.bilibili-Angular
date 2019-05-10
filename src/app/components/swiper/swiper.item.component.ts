import { OnInit, Component, ViewChild, ElementRef, HostBinding } from '@angular/core';


@Component({
    selector: "swiper-item",
    templateUrl: './swiper.item.component.html',
    styleUrls: ['./swiper.item.component.scss']
})
export class SwiperItem implements OnInit {

    constructor(private elementRef:ElementRef){}

    public positionIndex: number;

    public isMoving: boolean;

    public self:ElementRef=this.elementRef;

    @HostBinding('style.height')
    public height:string;

    @HostBinding('style.transform')
    get transform() {
        return 'translate3d(' + this.moveX + 'px,0,0)';
    }

    @HostBinding('style.transition')
    get transition() {
        return this.isMoving ? '' : '300ms';
    }
    private _positionX: number
    get positionX() {
        return this._positionX;
    }
    set positionX(value) {
        this._positionX = value;
        this.moveX = value;
    }

    public moveX: number = 0;

    ngOnInit(): void {
        
    }
}