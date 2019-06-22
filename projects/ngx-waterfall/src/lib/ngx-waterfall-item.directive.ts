import { Directive, ElementRef, OnInit, HostBinding } from '@angular/core'

@Directive({
  selector: '[ngx-waterfall-item]'
})
export class NgxWaterfallItemDirective implements OnInit {
  constructor(public el: ElementRef) {}

  @HostBinding('class.ngx-waterfall-item')
  itemClass = true

  ngOnInit() {}
}
