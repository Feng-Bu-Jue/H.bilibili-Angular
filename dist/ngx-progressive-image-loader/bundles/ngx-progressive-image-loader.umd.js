(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('ngx-window-token'), require('@angular/platform-browser'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-progressive-image-loader', ['exports', '@angular/common', 'ngx-window-token', '@angular/platform-browser', '@angular/core'], factory) :
    (factory((global['ngx-progressive-image-loader'] = {}),global.ng.common,global.ngxWindowToken,global.ng.platformBrowser,global.ng.core));
}(this, (function (exports,common,ngxWindowToken,platformBrowser,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var IMAGE_LOADER_CONFIG_TOKEN = new core.InjectionToken('Image loader Config');
    /** @type {?} */
    var DEFAULT_IMAGE_LOADER_OPTIONS = ( /** @type {?} */({
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
    var ConfigurationService = /** @class */ (function () {
        function ConfigurationService(options) {
            this.setConfig(options);
        }
        /**
         * @param {?} config
         * @return {?}
         */
        ConfigurationService.prototype.setConfig = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                if (config) {
                    this.config = __assign({}, DEFAULT_IMAGE_LOADER_OPTIONS, config);
                }
                else {
                    this.config = DEFAULT_IMAGE_LOADER_OPTIONS;
                }
            };
        ConfigurationService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigurationService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [IMAGE_LOADER_CONFIG_TOKEN,] }] }
            ];
        };
        return ConfigurationService;
    }());

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
            var sourceElms = image.parentElement.children;
            for (var index = 0; index < sourceElms.length; index++) {
                /** @type {?} */
                var element = sourceElms[index];
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
    var ProgressiveImageLoaderComponent = /** @class */ (function () {
        function ProgressiveImageLoaderComponent(element, _Renderer, _ConfigurationService, platformId, window) {
            this._Renderer = _Renderer;
            this._ConfigurationService = _ConfigurationService;
            this.platformId = platformId;
            this.window = window;
        }
        /**
         * @return {?}
         */
        ProgressiveImageLoaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (isSupportIntersectionObserver(this.window) &&
                    !isSpider(this.window) &&
                    common.isPlatformBrowser(this.platformId)) {
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
            };
        /**
         * @param {?} entries
         * @param {?} observer
         * @return {?}
         */
        ProgressiveImageLoaderComponent.prototype.onIntersectionChanged = /**
         * @param {?} entries
         * @param {?} observer
         * @return {?}
         */
            function (entries, observer) {
                var _this = this;
                entries.forEach(( /**
                 * @param {?} entry
                 * @return {?}
                 */function (entry) {
                    return entry.isIntersecting &&
                        _this.onImageAppearsInViewport(( /** @type {?} */(entry.target)), observer);
                }));
            };
        /**
         * @param {?} image
         * @param {?} observer
         * @return {?}
         */
        ProgressiveImageLoaderComponent.prototype.onImageAppearsInViewport = /**
         * @param {?} image
         * @param {?} observer
         * @return {?}
         */
            function (image, observer) {
                // Stop observing the current target
                observer.unobserve(image);
                loadImage(this._Renderer, image);
            };
        /**
         * @return {?}
         */
        ProgressiveImageLoaderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.intersectionObserver && this.intersectionObserver.disconnect();
            };
        ProgressiveImageLoaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-progressive-image-loader',
                        template: "\n    <ng-content></ng-content>\n  "
                    }] }
        ];
        /** @nocollapse */
        ProgressiveImageLoaderComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: ConfigurationService },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: undefined, decorators: [{ type: core.Inject, args: [ngxWindowToken.WINDOW,] }] }
            ];
        };
        ProgressiveImageLoaderComponent.propDecorators = {
            imageRatio: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            placeholderImageSrc: [{ type: core.Input }]
        };
        return ProgressiveImageLoaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImagePlaceholderComponent = /** @class */ (function () {
        function ImagePlaceholderComponent(sanitizer, _ProgressiveImageLoader) {
            this.sanitizer = sanitizer;
            this._ProgressiveImageLoader = _ProgressiveImageLoader;
            this.class = 'ngx-image-placeholder';
        }
        Object.defineProperty(ImagePlaceholderComponent.prototype, "placeHolder", {
            get: /**
             * @return {?}
             */ function () {
                return this.sanitizer.bypassSecurityTrustStyle("padding-bottom: " + 100 / (this.imageRatio || this._ProgressiveImageLoader.imageRatio) + "%;");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImagePlaceholderComponent.prototype, "imageFilter", {
            get: /**
             * @return {?}
             */ function () {
                return this.sanitizer.bypassSecurityTrustStyle("" + this._ProgressiveImageLoader.filter);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImagePlaceholderComponent.prototype, "safeLoadingImage", {
            get: /**
             * @return {?}
             */ function () {
                return this.sanitizer.bypassSecurityTrustUrl(this.placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ImagePlaceholderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        ImagePlaceholderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-image-placeholder',
                        template: "\n    <img class=\"placeholder-loading-image\" [src]=\"safeLoadingImage\" [style.filter]=\"imageFilter\" />\n    <ng-content></ng-content>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        ImagePlaceholderComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer },
                { type: ProgressiveImageLoaderComponent }
            ];
        };
        ImagePlaceholderComponent.propDecorators = {
            class: [{ type: core.HostBinding, args: ['class',] }],
            placeHolder: [{ type: core.HostBinding, args: ['style',] }],
            imageRatio: [{ type: core.Input }],
            placeholderImageSrc: [{ type: core.Input }]
        };
        return ImagePlaceholderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProgressiveImageDirective = /** @class */ (function () {
        function ProgressiveImageDirective(_ElementRef, _Renderer, window, _ConfigurationService, _ImagePlaceholder, _ProgressiveImageLoader) {
            this._ElementRef = _ElementRef;
            this._Renderer = _Renderer;
            this.window = window;
            this._ConfigurationService = _ConfigurationService;
            this._ImagePlaceholder = _ImagePlaceholder;
            this._ProgressiveImageLoader = _ProgressiveImageLoader;
            this.noPlaceholder = false;
            this.isObserve = false;
        }
        Object.defineProperty(ProgressiveImageDirective.prototype, "imageRatio", {
            get: /**
             * @return {?}
             */ function () {
                return this._imageRatio || this._ProgressiveImageLoader.imageRatio;
            },
            // to create a placeholder before finish loading the real image to avoid reflow
            set: 
            // to create a placeholder before finish loading the real image to avoid reflow
            /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._imageRatio = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressiveImageDirective.prototype, "placeholderImageSrc", {
            get: /**
             * @return {?}
             */ function () {
                return this._placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._placeholderImageSrc = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ProgressiveImageDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.imageElement = this._ElementRef.nativeElement;
                this.setDataSrc('data-src', this.src);
                this.setDataSrc('data-srcset', this.srcset);
                if (this._ProgressiveImageLoader.intersectionObserver) {
                    // only image element need to be observe and have onload event
                    if (this.imageElement instanceof HTMLImageElement) {
                        this.isObserve = true;
                        this._ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
                        this.imageElement.onload = ( /**
                         * @return {?}
                         */function () {
                            _this.imageElement.classList.add('loaded');
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
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        ProgressiveImageDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
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
            };
        /**
         * @param {?} attr
         * @param {?} value
         * @return {?}
         */
        ProgressiveImageDirective.prototype.setDataSrc = /**
         * @param {?} attr
         * @param {?} value
         * @return {?}
         */
            function (attr, value) {
                value && this._Renderer.setAttribute(this.imageElement, attr, value);
            };
        /**
         * @return {?}
         */
        ProgressiveImageDirective.prototype.setPlaceholder = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var parentElement = this.imageElement.parentElement;
                /** @type {?} */
                var placeholder = this.createPlaceholder(this.createPlaceholderImage());
                if (isPictureElement(parentElement)) {
                    /** @type {?} */
                    var pictureParent = parentElement.parentElement;
                    this.insertPlaceholder(pictureParent, parentElement, placeholder);
                }
                else {
                    this.insertPlaceholder(parentElement, this.imageElement, placeholder);
                }
            };
        /**
         * @param {?} parentElement
         * @param {?} imagePicture
         * @param {?} placeholder
         * @return {?}
         */
        ProgressiveImageDirective.prototype.insertPlaceholder = /**
         * @param {?} parentElement
         * @param {?} imagePicture
         * @param {?} placeholder
         * @return {?}
         */
            function (parentElement, imagePicture, placeholder) {
                parentElement.insertBefore(placeholder, imagePicture);
                placeholder.style.paddingBottom = 100 / this.imageRatio + "%";
                placeholder.appendChild(imagePicture);
            };
        /**
         * @param {?} placeholderImage
         * @return {?}
         */
        ProgressiveImageDirective.prototype.createPlaceholder = /**
         * @param {?} placeholderImage
         * @return {?}
         */
            function (placeholderImage) {
                /** @type {?} */
                var placeholder = document.createElement('div');
                placeholder.classList.add('ngx-image-placeholder');
                placeholder.appendChild(placeholderImage);
                return placeholder;
            };
        /**
         * @return {?}
         */
        ProgressiveImageDirective.prototype.createPlaceholderImage = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var img = new Image();
                img.classList.add('placeholder-loading-image');
                img.style.filter = this._ProgressiveImageLoader.filter;
                img.src = this.placeholderImageSrc;
                return img;
            };
        ProgressiveImageDirective.decorators = [
            { type: core.Directive, args: [{
                        // make sure the element is an image element
                        selector: 'img[ngxProgressiveImage], source[ngxProgressiveImage]'
                    },] }
        ];
        /** @nocollapse */
        ProgressiveImageDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: undefined, decorators: [{ type: core.Inject, args: [ngxWindowToken.WINDOW,] }] },
                { type: ConfigurationService },
                { type: ImagePlaceholderComponent, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ImagePlaceholderComponent,] }] },
                { type: ProgressiveImageLoaderComponent, decorators: [{ type: core.Inject, args: [ProgressiveImageLoaderComponent,] }] }
            ];
        };
        ProgressiveImageDirective.propDecorators = {
            imageRatio: [{ type: core.Input }],
            placeholderImageSrc: [{ type: core.Input }],
            src: [{ type: core.Input }],
            srcset: [{ type: core.Input }],
            noPlaceholder: [{ type: core.Input }]
        };
        return ProgressiveImageDirective;
    }());

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
    var NgxProgressiveImageLoaderModule = /** @class */ (function () {
        function NgxProgressiveImageLoaderModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        NgxProgressiveImageLoaderModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
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
            };
        NgxProgressiveImageLoaderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [
                            ProgressiveImageLoaderComponent,
                            ProgressiveImageDirective,
                            ImagePlaceholderComponent
                        ],
                        exports: [ProgressiveImageLoaderComponent, ProgressiveImageDirective, ImagePlaceholderComponent]
                    },] }
        ];
        return NgxProgressiveImageLoaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ProgressiveImageLoaderComponent = ProgressiveImageLoaderComponent;
    exports.ProgressiveImageDirective = ProgressiveImageDirective;
    exports.ImagePlaceholderComponent = ImagePlaceholderComponent;
    exports.ConfigurationServiceFactory = ConfigurationServiceFactory;
    exports.NgxProgressiveImageLoaderModule = NgxProgressiveImageLoaderModule;
    exports.IMAGE_LOADER_CONFIG_TOKEN = IMAGE_LOADER_CONFIG_TOKEN;
    exports.DEFAULT_IMAGE_LOADER_OPTIONS = DEFAULT_IMAGE_LOADER_OPTIONS;
    exports.isSupportIntersectionObserver = isSupportIntersectionObserver;
    exports.isImagePicture = isImagePicture;
    exports.setAttribute = setAttribute;
    exports.isPictureElement = isPictureElement;
    exports.loadImage = loadImage;
    exports.isSpider = isSpider;
    exports.ɵa = ConfigurationService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-progressive-image-loader.umd.js.map