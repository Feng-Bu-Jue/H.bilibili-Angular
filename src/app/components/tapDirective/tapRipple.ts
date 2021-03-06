import { HostBinding, ElementRef, Directive, Renderer2, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { IonContent, IonSlides } from '@ionic/angular';


@Directive({
  selector: '[TapRipple]',
})
export class TapRipple {

  public rippleElement: HTMLElement;
  public containerElement: HTMLElement;
  public isRemoved: boolean = true;

  @HostBinding("style.position")
  public position = "relative";

  @Input("transition")
  public transition = "all 0.5s ease-in-out"

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    let el = <HTMLElement>this.element.nativeElement;
    fromEvent(el, "touchstart")
      .subscribe((touchEvent: TouchEvent) => {
        this.addRipple(el, touchEvent);
      });

    fromEvent(el, "touchmove")
      .subscribe((touchEvent: TouchEvent) => {
        //this.removeRipple(el);
      });

    fromEvent(el, "touchend")
      .subscribe((touchEvent: TouchEvent) => {
        //this.removeRipple(el);
      });
  }

  private addRipple(parentElment: HTMLElement, touchEvent: TouchEvent) {
    this.rippleElement = this.createRippleElement(parentElment, touchEvent);
    this.containerElement = this.createContainerElement();

    this.renderer.appendChild(this.containerElement, this.rippleElement);
    this.renderer.appendChild(parentElment, this.containerElement);
    this.isRemoved = false;

    setTimeout(() => {
      let targetDistance = Math.sqrt(Math.pow(parentElment.offsetWidth,2) + Math.pow(parentElment.offsetHeight,2))
      let factor = Math.ceil(targetDistance / (parentElment.clientWidth / 2));
      this.renderer.setStyle(this.rippleElement, "transform", "scale(" + factor + ")");
      /*
      fromEvent(this.rippleElement, "transitionend")
        .subscribe(() => {
          this.removeRipple(parentElment);
        })
      */
    }, 10);
  }

  private removeRipple(parentElment: HTMLElement) {
    if (!this.isRemoved) {
      this.renderer.removeChild(parentElment, this.containerElement);
      this.isRemoved = true;
    }
  }

  private createRippleElement(parentElment: HTMLElement, touchEvent: TouchEvent): HTMLElement {
    let rect = parentElment.getBoundingClientRect();

    let rippleElemnt = this.renderer.createElement("div");

    this.setRippleElementStyle(
      rippleElemnt,
      parentElment,
      touchEvent.changedTouches[0].clientX - rect.left,
      touchEvent.changedTouches[0].clientY - rect.top);
    return rippleElemnt;
  }

  private createContainerElement(): HTMLElement {
    let containerElemnt = <HTMLElement>this.renderer.createElement("div");
    this.setContaierElementStyle(containerElemnt);
    return containerElemnt;
  }

  private setRippleElementStyle(element: HTMLElement, parentElment: HTMLElement, left: number, top: number): void {
    element.style.position = "absolute";
    element.style.transition = this.transition;
    element.style.height = parentElment.clientWidth / 2 + "px";
    element.style.width = parentElment.clientWidth / 2 + "px";
    element.style.backgroundColor = "rgb(140,140,140)";
    element.style.opacity = "0.35";
    element.style.borderRadius = "50%";
    element.style.left = left + "px";
    element.style.top = top + "px";
  }

  private setContaierElementStyle(element: HTMLElement) {
    element.style.position = "absolute";
    element.style.top = "0";
    element.style.bottom = "0";
    element.style.left = "0";
    element.style.right = "0";
    element.style.pointerEvents = "none";
    element.style.borderRadius = "inherit";
    element.style.overflow = "hidden";
    element.style.transform = "translateZ(0)";
  }

}
