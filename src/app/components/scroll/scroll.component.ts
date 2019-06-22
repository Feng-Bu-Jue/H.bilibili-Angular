import { Component, OnInit, HostBinding, Output, EventEmitter, ElementRef, Input} from '@angular/core';
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

  @Output()
  public onScroll: EventEmitter<Event> = new EventEmitter();

  @Output()
  public onScrollLower: EventEmitter<Event> = new EventEmitter(true);

  @Output()
  public onScrollUpper: EventEmitter<Event> = new EventEmitter();

  @HostBinding("class.scroll-y")
  get class() {
    return this.scrollY;
  }

  @Input()
  @HostBinding("style.height")
  public height: number;

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit() {
    let el = <HTMLElement>this.element.nativeElement;
    let observable: Observable<Event> = fromEvent(el, 'scroll');
    observable.pipe(
      throttleTime(20)
    ).subscribe((event) => {
      this.onScroll.emit(event);
      if (el.scrollTop == 0 + this.upperOffset) {
        this.onScrollUpper.emit(event);
      }
      if (el.scrollTop + el.clientHeight >= (el.scrollHeight - this.lowerOffset)) {
        this.onScrollLower.emit(event);
      }
    });
  }

}
