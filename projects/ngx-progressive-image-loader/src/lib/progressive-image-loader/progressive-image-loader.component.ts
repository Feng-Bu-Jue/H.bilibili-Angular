import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { ConfigurationService } from '../configuration.service';
import { isSpider, isSupportIntersectionObserver, loadImage } from '../util';

@Component({
  selector: 'ngx-progressive-image-loader',
  template: `
    <ng-content></ng-content>
  `
})
export class ProgressiveImageLoaderComponent implements OnInit, OnDestroy {
  // define the placeholder height for all images inside this components
  @Input()
  imageRatio: number;
  @Input()
  filter: string;
  // the src of loading image
  @Input()
  placeholderImageSrc: string;
  @Input()
  maxHeight: number;

  intersectionObserver: IntersectionObserver;

  constructor(
    element: ElementRef,
    public _Renderer: Renderer2,
    public _ConfigurationService: ConfigurationService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WINDOW) private window: any
  ) { }

  ngOnInit() {
    if (
      isSupportIntersectionObserver(this.window) &&
      !isSpider(this.window) &&
      isPlatformBrowser(this.platformId)
    ) {
      if (!this.imageRatio) {
        this.imageRatio = this._ConfigurationService.config.imageRatio;
      }

      if (!this.filter) {
        this.filter = this._ConfigurationService.config.filter;
      }
      if (!this.placeholderImageSrc) {
        this.placeholderImageSrc = this._ConfigurationService.config.placeholderImageSrc;

      }
      if (!this.maxHeight) {
        this.maxHeight = this._ConfigurationService.config.maxHeight;
      }

      this.intersectionObserver = new IntersectionObserver(
        this.onIntersectionChanged.bind(this),
        this._ConfigurationService.config
      );
    }
  }

  onIntersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(
      entry => {
        entry.isIntersecting &&
          this.onImageAppearsInViewport(entry.target as HTMLElement, observer)
      }
    );
  }

  onImageAppearsInViewport(element: HTMLElement, observer: IntersectionObserver) {
    // Stop observing the current target
    observer.unobserve(element);
    loadImage(this._Renderer, element);
  }

  ngOnDestroy(): void {
    this.intersectionObserver && this.intersectionObserver.disconnect();
  }
}

