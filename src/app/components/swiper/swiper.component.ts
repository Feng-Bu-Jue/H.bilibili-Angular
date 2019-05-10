import { OnInit, Component, ViewChild, ContentChildren, QueryList, ElementRef, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit, ViewChildren, HostBinding, HostListener, Self, Input } from '@angular/core';
import { SwiperItem } from './swiper.item.component';
import { Subject, timer } from 'rxjs';
import { map, throttleTime, bufferCount, first, takeUntil } from 'rxjs/operators';

const enum Position {
    Left = 1,
    Right = -1
}

@Component({
    selector: "swiper",
    templateUrl: './swiper.component.html',
    styleUrls: ['./swiper.component.scss']
})
export class Swiper implements OnInit, AfterContentInit {

    constructor() { }

    private sX: number = 0;
    private sY: number = 0;
    private mX: number = 0;
    private mY: number = 0;
    private offsetWidth: number = 0;
    private activeIndex: number = 0;

    private subject = new Subject<TouchEvent>();

    @ContentChildren(SwiperItem, { descendants: true })
    public swiperItems: QueryList<SwiperItem>;

    @ViewChildren(SwiperItem)
    public swiperItemsref: QueryList<any>;

    private _height: string;
    @Input("height")
    @HostBinding('style.height')
    public set height(value) {
        this._height = value;
        this.onResize();
    }
    public get height() {
        return this._height;
    }

    ngOnInit(): void {

    }

    ngAfterContentInit(): void {
        this.swiperItems.forEach((el, index) => {
            el.positionIndex = index - this.activeIndex;
        });
        this.onResize();
    }

    @HostListener('window:resize', [])
    onResize(): void {
        if (this.swiperItems) {
            this.offsetWidth = this.swiperItems.first.self.nativeElement.offsetWidth;
            this.swiperItems.forEach((el, index) => {
                el.positionX = el.positionIndex * this.offsetWidth;
                el.height = this.height;
            });
        }
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent): void {
        this.subject.pipe(
            throttleTime(20),
            bufferCount(2),
            map(events=>{
                if(events.length<2)
                    return false;
                
                const first = events[0], second = events[1];
                this.sX=first.changedTouches[0].clientX;
                this.sY=first.changedTouches[0].clientY;
                const distanceX = Math.abs(first.changedTouches[0].clientX - second.changedTouches[0].clientX);
                const distanceY = Math.abs(first.changedTouches[0].clientY - second.changedTouches[0].clientY);
                return distanceX > distanceY;
            }),
            first()
        ).subscribe(isHorizontal => {
            if (isHorizontal) {
                event.preventDefault();
                this.swiperItems.forEach(el => el.isMoving = true);
                this.subject.subscribe((event) => {
                    this.mX = this.sX - event.changedTouches[0].clientX;
                    this.mY = this.sY - event.changedTouches[0].clientY;
                    this.swiperItems.forEach((el, index) => {
                        el.moveX = el.positionX - this.mX;
                    });
                },
                (e) =>{},
                ()=> {
                    const factor = 3;
                    let position = this.mX > 0 ? Position.Left : Position.Right;
                    const canMove =
                        (this.activeIndex == 0 ?
                            position == Position.Left :
                            this.activeIndex == this.swiperItems.length - 1 ?
                                position == Position.Right :
                                true
                        )
                        &&
                        Math.abs(this.mX) > this.offsetWidth / factor;
                    if (canMove) {
                        this.activeIndex += position;
                    }
                    //change the item position
                    this.swiperItems.forEach((el, index) => {
                        el.isMoving = false;
                        el.positionIndex = index - this.activeIndex;
                        el.positionX = el.positionIndex * this.offsetWidth;
                    });
                })
            }
        });
        this.subject.next(event);
        
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent): void {
        this.subject.next(event);

    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent): void {
        this.subject.complete();
        this.subject=new Subject<TouchEvent>();//give new object to subject,old has been completed
    }
}