import { OnInit, Component, ContentChildren, QueryList, AfterContentInit, HostListener } from '@angular/core';
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
    //Todo use linkList improve this component
    constructor() {}

    private sX: number = 0;
    private sY: number = 0;
    private mX: number = 0;
    private mY: number = 0;
    private offsetWidth: number = 0;
    private activeIndex: number = 0;

    private subject = new Subject<TouchEvent>();

    @ContentChildren(SwiperItem, { descendants: true })
    public swiperItems: QueryList<SwiperItem>;

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
        this.offsetWidth = this.swiperItems.first.self.nativeElement.offsetWidth;
        this.itemPosition();
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent): void {
        this.subject.pipe(
            throttleTime(20),
            bufferCount(2),
            map(events => {
                if (events.length < 2)
                    return false;
                    
                const firstTouches = events[0].changedTouches[0], secondTouches = events[1].changedTouches[0];
                this.sX = firstTouches.clientX;
                this.sY = secondTouches.clientY;
                const distanceX = Math.abs(firstTouches.clientX - secondTouches.clientX);
                const distanceY = Math.abs(firstTouches.clientY - secondTouches.clientY);
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
                    (e) => { },
                    () => {
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
                        this.itemPosition();
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
        this.subject = new Subject<TouchEvent>();//give new object to subject,old has been completed
    }

    itemPosition() {
        this.swiperItems.forEach((el, index) => {
            el.isMoving = false;
            el.positionIndex = index - this.activeIndex;
            el.positionX = el.positionIndex * this.offsetWidth;
        });
    }
}