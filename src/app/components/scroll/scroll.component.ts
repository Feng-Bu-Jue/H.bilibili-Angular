import { Component, OnInit, HostBinding, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class Scroll implements OnInit {

  @Input()
  public scrollY: boolean = true;

  @Input()
  public lowerOffset: number = 0;

  @Input()
  public upperOffset: number = 0;

  @Input()
  public disableScrollEvent: boolean;

  @Output()
  public onScroll: EventEmitter<Event> = new EventEmitter();

  @Output()
  public onScrollLower: EventEmitter<Event> = new EventEmitter(true);

  @Output()
  public onScrollUpper: EventEmitter<Event> = new EventEmitter();

  private scrollTop: number = 0;

  @HostBinding("class.scroll-y")
  get class() {
    return this.scrollY;
  }

  @Input()
  @HostBinding("style.height")
  public height: number;
  public loading: boolean = false

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit() {
    let el = <HTMLElement>this.element.nativeElement;
    let observable: Observable<Event> = fromEvent(el, 'scroll');
    observable.pipe(
      throttleTime(20)
    ).subscribe((event) => {
      if (!this.disableScrollEvent) {
        if (event.target["scrollTop"] - this.scrollTop > 0) {
          event.target["direction"] = "down";
        }
        else {
          event.target["direction"] = "up";
        }
        this.scrollTop = event.target["scrollTop"]
        /*
        if (el.scrollTop == 0 + this.upperOffset) {
          this.onScrollUpper.emit(event);
        }
        */
        this.onScroll.emit(event);
        if (!this.loading) {
          if (el.scrollTop + el.clientHeight >= (el.scrollHeight - this.lowerOffset)) {
            var that = this;
            this.loading = true;
            event.target["complete"] = () => {
              that.loading = false;
            }
            this.onScrollLower.emit(event);
          }
        }
      }
    });
  }

}
