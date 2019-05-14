import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from 'ngx-window-token';
import { DomSanitizer } from '@angular/platform-browser';
import { InjectionToken, Inject, Injectable, Component, ElementRef, Input, PLATFORM_ID, Renderer2, ChangeDetectionStrategy, HostBinding, Directive, Optional, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const IMAGE_LOADER_CONFIG_TOKEN = new InjectionToken('Image loader Config');
/** @type {?} */
const DEFAULT_IMAGE_LOADER_OPTIONS = (/** @type {?} */ ({
    // root?: Element | null;
    rootMargin: '10px',
    threshold: 0.1,
    imageRatio: 16 / 9,
    placeholderImageSrc: ''
}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfigurationService {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.setConfig(options);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        if (config) {
            this.config = Object.assign({}, DEFAULT_IMAGE_LOADER_OPTIONS, config);
        }
        else {
            this.config = DEFAULT_IMAGE_LOADER_OPTIONS;
        }
    }
}
ConfigurationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigurationService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [IMAGE_LOADER_CONFIG_TOKEN,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} window
 * @return {?}
 */
function isSupportIntersectionObserver(window) {
    return (window &&
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype);
}
/**
 * @param {?} element
 * @return {?}
 */
function isImagePicture(element) {
    return element instanceof HTMLImageElement || element instanceof HTMLPictureElement;
}
/**
 * @param {?} renderer
 * @param {?} attribute
 * @param {?} element
 * @return {?}
 */
function setAttribute(renderer, attribute, element) {
    renderer.setAttribute(element, attribute, element.dataset[attribute]);
    // maybe doesn't matter
    // renderer.removeAttribute(element, 'data-' + attribute);
}
/**
 * @param {?} element
 * @return {?}
 */
function isPictureElement(element) {
    return element.nodeName === 'PICTURE';
}
/**
 * @param {?} renderer
 * @param {?} image
 * @return {?}
 */
function loadImage(renderer, image) {
    if (isPictureElement(image.parentElement)) {
        /** @type {?} */
        const sourceElms = image.parentElement.children;
        for (let index = 0; index < sourceElms.length; index++) {
            /** @type {?} */
            const element = sourceElms[index];
            if (element instanceof HTMLSourceElement) {
                setAttribute(renderer, 'srcset', element);
            }
            else if (element instanceof HTMLImageElement) {
                setAttribute(renderer, 'src', element);
            }
        }
    }
    else {
        if (image.dataset.src) {
            setAttribute(renderer, 'src', image);
        }
        if (image.dataset.srcset) {
            setAttribute(renderer, 'srcset', image);
        }
    }
}
/**
 * @param {?} window
 * @return {?}
 */
function isSpider(window) {
    return ((window && !('onscroll' in window)) ||
        /(gle|ing|ro)bot|crawl|spider/i.test(window.navigator.userAgent));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProgressiveImageLoaderComponent {
    /**
     * @param {?} element
     * @param {?} _Renderer
     * @param {?} _ConfigurationService
     * @param {?} platformId
     * @param {?} window
     */
    constructor(element, _Renderer, _ConfigurationService, platformId, window) {
        this._Renderer = _Renderer;
        this._ConfigurationService = _ConfigurationService;
        this.platformId = platformId;
        this.window = window;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isSupportIntersectionObserver(this.window) &&
            !isSpider(this.window) &&
            isPlatformBrowser(this.platformId)) {
            if (!this.imageRatio) {
                this.imageRatio = this._ConfigurationService.config.imageRatio;
            }
            if (!this.filter) {
                this.filter = this._ConfigurationService.config.filter;
            }
            if (!this.placeholderImageSrc) {
                this.placeholderImageSrc = this._ConfigurationService.config.placeholderImageSrc;
            }
            this.intersectionObserver = new IntersectionObserver(this.onIntersectionChanged.bind(this), this._ConfigurationService.config);
        }
    }
    /**
     * @param {?} entries
     * @param {?} observer
     * @return {?}
     */
    onIntersectionChanged(entries, observer) {
        entries.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        entry => entry.isIntersecting &&
            this.onImageAppearsInViewport((/** @type {?} */ (entry.target)), observer)));
    }
    /**
     * @param {?} image
     * @param {?} observer
     * @return {?}
     */
    onImageAppearsInViewport(image, observer) {
        // Stop observing the current target
        observer.unobserve(image);
        loadImage(this._Renderer, image);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.intersectionObserver && this.intersectionObserver.disconnect();
    }
}
ProgressiveImageLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-progressive-image-loader',
                template: `
    <ng-content></ng-content>
  `
            }] }
];
/** @nocollapse */
ProgressiveImageLoaderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ConfigurationService },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] }
];
ProgressiveImageLoaderComponent.propDecorators = {
    imageRatio: [{ type: Input }],
    filter: [{ type: Input }],
    placeholderImageSrc: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImagePlaceholderComponent {
    /**
     * @param {?} sanitizer
     * @param {?} _ProgressiveImageLoader
     */
    constructor(sanitizer, _ProgressiveImageLoader) {
        this.sanitizer = sanitizer;
        this._ProgressiveImageLoader = _ProgressiveImageLoader;
        this.class = 'ngx-image-placeholder';
    }
    /**
     * @return {?}
     */
    get placeHolder() {
        return this.sanitizer.bypassSecurityTrustStyle(`padding-bottom: ${100 / (this.imageRatio || this._ProgressiveImageLoader.imageRatio)}%;`);
    }
    /**
     * @return {?}
     */
    get imageFilter() {
        return this.sanitizer.bypassSecurityTrustStyle(`${this._ProgressiveImageLoader.filter}`);
    }
    /**
     * @return {?}
     */
    get safeLoadingImage() {
        return this.sanitizer.bypassSecurityTrustUrl(this.placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc);
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
ImagePlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-image-placeholder',
                template: `
    <img class="placeholder-loading-image" [src]="safeLoadingImage" [style.filter]="imageFilter" />
    <ng-content></ng-content>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ImagePlaceholderComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ProgressiveImageLoaderComponent }
];
ImagePlaceholderComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    placeHolder: [{ type: HostBinding, args: ['style',] }],
    imageRatio: [{ type: Input }],
    placeholderImageSrc: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProgressiveImageDirective {
    /**
     * @param {?} _ElementRef
     * @param {?} _Renderer
     * @param {?} window
     * @param {?} _ConfigurationService
     * @param {?} _ImagePlaceholder
     * @param {?} _ProgressiveImageLoader
     */
    constructor(_ElementRef, _Renderer, window, _ConfigurationService, _ImagePlaceholder, _ProgressiveImageLoader) {
        this._ElementRef = _ElementRef;
        this._Renderer = _Renderer;
        this.window = window;
        this._ConfigurationService = _ConfigurationService;
        this._ImagePlaceholder = _ImagePlaceholder;
        this._ProgressiveImageLoader = _ProgressiveImageLoader;
        this.noPlaceholder = false;
        this.isObserve = false;
    }
    // to create a placeholder before finish loading the real image to avoid reflow
    /**
     * @param {?} value
     * @return {?}
     */
    set imageRatio(value) {
        this._imageRatio = value;
    }
    /**
     * @return {?}
     */
    get imageRatio() {
        return this._imageRatio || this._ProgressiveImageLoader.imageRatio;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholderImageSrc(value) {
        this._placeholderImageSrc = value;
    }
    /**
     * @return {?}
     */
    get placeholderImageSrc() {
        return this._placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.imageElement = this._ElementRef.nativeElement;
        this.setDataSrc('data-src', this.src);
        this.setDataSrc('data-srcset', this.srcset);
        if (this._ProgressiveImageLoader.intersectionObserver) {
            // only image element need to be observe and have onload event
            if (this.imageElement instanceof HTMLImageElement) {
                this.isObserve = true;
                this._ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
                this.imageElement.onload = (/**
                 * @return {?}
                 */
                () => {
                    this.imageElement.classList.add('loaded');
                });
                if (!this._ImagePlaceholder && !this.noPlaceholder) {
                    this.setPlaceholder();
                }
            }
        }
        else {
            // show image directly
            loadImage(this._Renderer, this.imageElement);
            this.imageElement.classList.add('loaded');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        changes.src && !changes.src.isFirstChange() && this.setDataSrc('data-src', this.src);
        changes.srcset &&
            !changes.srcset.isFirstChange() &&
            this.setDataSrc('data-srcset', this.srcset);
        if (this.isObserve &&
            ((changes.src && !changes.src.isFirstChange()) ||
                (changes.srcset && !changes.srcset.isFirstChange()))) {
            this._ProgressiveImageLoader.intersectionObserver.unobserve(this.imageElement);
            this._ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
        }
    }
    /**
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    setDataSrc(attr, value) {
        value && this._Renderer.setAttribute(this.imageElement, attr, value);
    }
    /**
     * @return {?}
     */
    setPlaceholder() {
        /** @type {?} */
        const parentElement = this.imageElement.parentElement;
        /** @type {?} */
        const placeholder = this.createPlaceholder(this.createPlaceholderImage());
        if (isPictureElement(parentElement)) {
            /** @type {?} */
            const pictureParent = parentElement.parentElement;
            this.insertPlaceholder(pictureParent, parentElement, placeholder);
        }
        else {
            this.insertPlaceholder(parentElement, this.imageElement, placeholder);
        }
    }
    /**
     * @param {?} parentElement
     * @param {?} imagePicture
     * @param {?} placeholder
     * @return {?}
     */
    insertPlaceholder(parentElement, imagePicture, placeholder) {
        parentElement.insertBefore(placeholder, imagePicture);
        placeholder.style.paddingBottom = `${100 / this.imageRatio}%`;
        placeholder.appendChild(imagePicture);
    }
    /**
     * @param {?} placeholderImage
     * @return {?}
     */
    createPlaceholder(placeholderImage) {
        /** @type {?} */
        const placeholder = document.createElement('div');
        placeholder.classList.add('ngx-image-placeholder');
        placeholder.appendChild(placeholderImage);
        return placeholder;
    }
    /**
     * @return {?}
     */
    createPlaceholderImage() {
        /** @type {?} */
        const img = new Image();
        img.classList.add('placeholder-loading-image');
        img.style.filter = this._ProgressiveImageLoader.filter;
        img.src = this.placeholderImageSrc;
        return img;
    }
}
ProgressiveImageDirective.decorators = [
    { type: Directive, args: [{
                // make sure the element is an image element
                selector: 'img[ngxProgressiveImage], source[ngxProgressiveImage]'
            },] }
];
/** @nocollapse */
ProgressiveImageDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
    { type: ConfigurationService },
    { type: ImagePlaceholderComponent, decorators: [{ type: Optional }, { type: Inject, args: [ImagePlaceholderComponent,] }] },
    { type: ProgressiveImageLoaderComponent, decorators: [{ type: Inject, args: [ProgressiveImageLoaderComponent,] }] }
];
ProgressiveImageDirective.propDecorators = {
    imageRatio: [{ type: Input }],
    placeholderImageSrc: [{ type: Input }],
    src: [{ type: Input }],
    srcset: [{ type: Input }],
    noPlaceholder: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} options
 * @return {?}
 */
function ConfigurationServiceFactory(options) {
    return new ConfigurationService(options);
}
class NgxProgressiveImageLoaderModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NgxProgressiveImageLoaderModule,
            providers: [
                { provide: IMAGE_LOADER_CONFIG_TOKEN, useValue: config },
                {
                    provide: ConfigurationService,
                    useFactory: ConfigurationServiceFactory,
                    deps: [IMAGE_LOADER_CONFIG_TOKEN]
                }
            ]
        };
    }
}
NgxProgressiveImageLoaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ProgressiveImageLoaderComponent,
                    ProgressiveImageDirective,
                    ImagePlaceholderComponent
                ],
                exports: [ProgressiveImageLoaderComponent, ProgressiveImageDirective, ImagePlaceholderComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ProgressiveImageLoaderComponent, ProgressiveImageDirective, ImagePlaceholderComponent, ConfigurationServiceFactory, NgxProgressiveImageLoaderModule, IMAGE_LOADER_CONFIG_TOKEN, DEFAULT_IMAGE_LOADER_OPTIONS, isSupportIntersectionObserver, isImagePicture, setAttribute, isPictureElement, loadImage, isSpider, ConfigurationService as ɵa };

//# sourceMappingURL=ngx-progressive-image-loader.js.map