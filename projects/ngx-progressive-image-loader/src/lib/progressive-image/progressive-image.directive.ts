import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { ConfigurationService } from '../configuration.service';
import { ImagePlaceholderComponent } from '../image-placeholder/image-placeholder.component';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
import { isPictureElement, loadImage } from '../util';

@Directive({
  // make sure the element is an image element
  selector: 'img[ngxProgressiveImage], source[ngxProgressiveImage],*[ngxProgressiveBGImage]'
})
export class ProgressiveImageDirective implements OnInit, OnChanges {
  _imageRatio: number;
  // to create a placeholder before finish loading the real image to avoid reflow
  @Input()
  set imageRatio(value: number) {
    this._imageRatio = value;
  }
  get imageRatio() {
    return this._imageRatio || this._ProgressiveImageLoader.imageRatio;
  }

  // a loading image showing before the real image is loaded
  _placeholderImageSrc: string;
  @Input()
  set placeholderImageSrc(value: string) {
    this._placeholderImageSrc = value;
  }

  get placeholderImageSrc(): string {
    return this._placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc;
  }

  _maxHeight: number;
  @Input()
  set maxHeight(value: number) {
    this._maxHeight = value;
  }

  get maxHeight(): number {
    return this._maxHeight || this._ProgressiveImageLoader.maxHeight;
  }

  @Input()
  src: string;
  // tslint:disable-next-line:no-input-rename
  @Input()
  srcset: string;

  @Input()
  bgsrc: string;

  @Input()
  noPlaceholder = false;
  imageElement: HTMLImageElement;
  bgImageElement: HTMLElement;
  isObserve = false;
  constructor(
    private _ElementRef: ElementRef,
    public _Renderer: Renderer2,
    @Inject(WINDOW) private window: any,
    public _ConfigurationService: ConfigurationService,
    @Optional()
    @Inject(ImagePlaceholderComponent)
    private _ImagePlaceholder: ImagePlaceholderComponent,
    @Inject(ProgressiveImageLoaderComponent)
    private _ProgressiveImageLoader: ProgressiveImageLoaderComponent
  ) { }
  ngOnInit(): void {
    this.imageElement = this._ElementRef.nativeElement;
    this.setDataSrc('data-src', this.src);
    this.setDataSrc('data-srcset', this.srcset);
    if (this._ProgressiveImageLoader.intersectionObserver) {
      // only image element need to be observe and have onload event
      if (this.imageElement instanceof HTMLImageElement) {
        this.isObserve = true;

        this.imageElement.onload = () => {
          this.imageElement.classList.add('loaded');
        };

        if (!this._ImagePlaceholder && !this.noPlaceholder) {
          this.setPlaceholder();
        }

        if (isElementInViewport(this.imageElement)) {
          loadImage(this._Renderer, this.imageElement);
          console.log()
        }
        else {
          this._ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
        }
        console.log(this.imageElement);
      }
      else if (this._ElementRef.nativeElement instanceof HTMLElement) {
        this.bgImageElement = this._ElementRef.nativeElement;
        this.setDataSrc('data-bgsrc', this.bgsrc);
        this.isObserve = true;
        if (isElementInViewport(this.imageElement)) {
          loadImage(this._Renderer, this.imageElement);
        }
        else {
          this._ProgressiveImageLoader.intersectionObserver.observe(this.bgImageElement);
        }
        
        if (!this._ImagePlaceholder && !this.noPlaceholder) {
          this.setPlaceholder();
        }
      }
    } else {
      // show image directly
      loadImage(this._Renderer, this.imageElement);
      this.imageElement.classList.add('loaded');
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes.src && !changes.src.isFirstChange() && this.setDataSrc('data-src', this.src);
    changes.srcset &&
      !changes.srcset.isFirstChange() &&
      this.setDataSrc('data-srcset', this.srcset);

    if (
      this.isObserve &&
      ((changes.src && !changes.src.isFirstChange()) ||
        (changes.srcset && !changes.srcset.isFirstChange()))
    ) {
      this._ProgressiveImageLoader.intersectionObserver.unobserve(this.imageElement);
      this._ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
    }
  }
  setDataSrc(attr: string, value: string) {
    value && this._Renderer.setAttribute(this.imageElement, attr, value);
  }

  setPlaceholder() {
    const parentElement = this.imageElement.parentElement;
    const placeholder = this.createPlaceholder(this.createPlaceholderImage());
    if (isPictureElement(parentElement)) {
      const pictureParent = parentElement.parentElement;
      this.insertPlaceholder(pictureParent, parentElement, placeholder);
    } else {
      this.insertPlaceholder(parentElement, this.imageElement, placeholder);
    }
  }

  insertPlaceholder(
    parentElement: HTMLElement,
    imagePicture: HTMLElement,
    placeholder: HTMLElement
  ) {
    parentElement.insertBefore(placeholder, imagePicture);
    let palceHeight = 100 / this.imageRatio;
    palceHeight = palceHeight > this.maxHeight ? this.maxHeight : palceHeight;
    placeholder.style.paddingBottom = `${palceHeight}%`;
    placeholder.appendChild(imagePicture);
  }

  createPlaceholder(placeholderImage: HTMLImageElement) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('ngx-image-placeholder');
    placeholder.appendChild(placeholderImage);
    return placeholder;
  }

  createPlaceholderImage() {
    const img = new Image();
    img.classList.add('placeholder-loading-image');
    img.style.filter = this._ProgressiveImageLoader.filter;
    img.src = this.placeholderImageSrc;
    return img;
  }
}

export function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}