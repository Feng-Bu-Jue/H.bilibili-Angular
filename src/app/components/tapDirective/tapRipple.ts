import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, ElementRef, Input, DoCheck, AfterContentInit, Directive, Renderer2 } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';
import { IonContent } from '@ionic/angular';


@Directive({
  selector: '[TapRipple]',
})
export class TapRipple {

  public rippleElement: HTMLElement;
  public isRemoved: boolean = true;

  //TODO: should not change style with parent element,create container is a better way
  @HostBinding("style.overflow")
  overflow: string = "hidden";
  @HostBinding("style.transform")
  transform: string = "translateZ(0)"
  @HostBinding("style.position")
  position: string = "relative"

  initSize: number = 10

  constructor(
    private element: ElementRef,
    private component: IonContent,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    let el = <HTMLElement>this.element.nativeElement;
    fromEvent(el, "touchstart")
      .subscribe((touchEvent: TouchEvent) => {

        this.rippleElement = this.createRippleElement(el, touchEvent);
        this.renderer.appendChild(el, this.rippleElement);

        setTimeout(() => {
          let targetDistance = (el.offsetWidth > el.offsetHeight ? el.offsetWidth : el.offsetHeight) * 3;
          let magn = Math.ceil(targetDistance / this.initSize);
          this.renderer.setStyle(this.rippleElement, "transform", "scale(" + magn + ")");
        }, 10);
      });
    fromEvent(el, "touchmove")
      .subscribe((touchEvent: TouchEvent) => {
        if (!this.isRemoved) {
          this.renderer.removeChild(el, this.rippleElement);
          this.isRemoved = true;
        }
      });

    fromEvent(el, "touchend")
      .subscribe((touchEvent: TouchEvent) => {
        if (!this.isRemoved) {
          this.renderer.removeChild(el, this.rippleElement);
          this.isRemoved = true;
        }
      });
  }

  private createRippleElement(parentElment: HTMLElement, touchEvent: TouchEvent): HTMLElement {
    let height = parentElment.offsetHeight;
    let width = parentElment.offsetWidth;
    let rect = parentElment.getBoundingClientRect();

    let rippleElemnt = this.renderer.createElement("div");
    this.setRippleElementStyle(
      rippleElemnt,
      touchEvent.changedTouches[0].clientX - rect.left,
      touchEvent.changedTouches[0].clientY - rect.top);
    this.isRemoved = false;
    return rippleElemnt;
  }

  private removeRippleElement(parentElment: HTMLElement) {
    if (!this.isRemoved) {
      this.renderer.removeChild(parentElment, this.rippleElement);
      this.isRemoved = true;
    }
  }

  private setRippleElementStyle(element: HTMLElement, left: number, top: number): void {
    element.style.position = "absolute";
    element.style.transition = "all 0.8s ease-in-out";
    element.style.height = this.initSize + "px";
    element.style.width = this.initSize + "px";
    element.style.backgroundColor = "rgb(240,240,240,0.3)";
    element.style.borderRadius = "50%";
    element.style.left = left + "px";
    element.style.top = top + "px";
  }

}
