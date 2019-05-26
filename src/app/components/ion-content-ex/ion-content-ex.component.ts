import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, ElementRef, Input, DoCheck, AfterContentInit, Directive } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';
import { IonContent } from '@ionic/angular';

@Directive({
  selector: '[ionContentEx]',
})
export class IonContentEx {
  @Input()
  public lowerOffset: number = 0;

  @Input()
  public upperOffset: number = 0;

  @Output()
  public onScrollLower: EventEmitter<Event> = new EventEmitter(true);

  @Output()
  public onScrollUpper: EventEmitter<Event> = new EventEmitter();
  constructor(
    private element: ElementRef,
    private component: IonContent
  ) { }

  ngOnInit() {
    let el = <HTMLElement>this.element.nativeElement;
    this.component.ionScroll.pipe(
      throttleTime(20)
    ).subscribe((event) => {
      if (el.scrollTop == 0 + this.upperOffset) {
        this.onScrollUpper.emit(event);
      }
      if (el.scrollTop + el.clientHeight >= (el.scrollHeight - this.lowerOffset)) {
        debugger
        this.onScrollLower.emit(event);
      }
    });
  }
}
