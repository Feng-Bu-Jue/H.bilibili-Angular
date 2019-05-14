/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { ConfigurationService } from '../configuration.service';
import { ImagePlaceholderComponent } from '../image-placeholder/image-placeholder.component';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
import { isPictureElement, loadImage } from '../util';
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
         */
        function () {
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
         */
        function () {
            return this._placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
                this.imageElement.onload = (/**
                 * @return {?}
                 */
                function () {
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
        { type: Directive, args: [{
                    // make sure the element is an image element
                    selector: 'img[ngxProgressiveImage], source[ngxProgressiveImage]'
                },] }
    ];
    /** @nocollapse */
    ProgressiveImageDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
        { type: ConfigurationService },
        { type: ImagePlaceholderComponent, decorators: [{ type: Optional }, { type: Inject, args: [ImagePlaceholderComponent,] }] },
        { type: ProgressiveImageLoaderComponent, decorators: [{ type: Inject, args: [ProgressiveImageLoaderComponent,] }] }
    ]; };
    ProgressiveImageDirective.propDecorators = {
        imageRatio: [{ type: Input }],
        placeholderImageSrc: [{ type: Input }],
        src: [{ type: Input }],
        srcset: [{ type: Input }],
        noPlaceholder: [{ type: Input }]
    };
    return ProgressiveImageDirective;
}());
export { ProgressiveImageDirective };
if (false) {
    /** @type {?} */
    ProgressiveImageDirective.prototype._imageRatio;
    /** @type {?} */
    ProgressiveImageDirective.prototype._placeholderImageSrc;
    /** @type {?} */
    ProgressiveImageDirective.prototype.src;
    /** @type {?} */
    ProgressiveImageDirective.prototype.srcset;
    /** @type {?} */
    ProgressiveImageDirective.prototype.noPlaceholder;
    /** @type {?} */
    ProgressiveImageDirective.prototype.imageElement;
    /** @type {?} */
    ProgressiveImageDirective.prototype.isObserve;
    /**
     * @type {?}
     * @private
     */
    ProgressiveImageDirective.prototype._ElementRef;
    /** @type {?} */
    ProgressiveImageDirective.prototype._Renderer;
    /**
     * @type {?}
     * @private
     */
    ProgressiveImageDirective.prototype.window;
    /** @type {?} */
    ProgressiveImageDirective.prototype._ConfigurationService;
    /**
     * @type {?}
     * @private
     */
    ProgressiveImageDirective.prototype._ImagePlaceholder;
    /**
     * @type {?}
     * @private
     */
    ProgressiveImageDirective.prototype._ProgressiveImageLoader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NpdmUtaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9ncmVzc2l2ZS1pbWFnZS9wcm9ncmVzc2l2ZS1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDN0YsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDakgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV0RDtJQW9DRSxtQ0FDVSxXQUF1QixFQUN4QixTQUFvQixFQUNILE1BQVcsRUFDNUIscUJBQTJDLEVBRzFDLGlCQUE0QyxFQUU1Qyx1QkFBd0Q7UUFSeEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNILFdBQU0sR0FBTixNQUFNLENBQUs7UUFDNUIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQUcxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTJCO1FBRTVDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBaUM7UUFabEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVdmLENBQUM7SUF2Q0osc0JBQ0ksaURBQVU7Ozs7UUFHZDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJ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Q3JCLENBQUM7Ozs7SUFFRCwwREFBc0I7OztJQUF0Qjs7WUFDUSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDdkIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1FBQ3ZELEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ25DLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBM0hGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLHVEQUF1RDtpQkFDbEU7Ozs7Z0JBbkJDLFVBQVU7Z0JBTVYsU0FBUztnREFpRE4sTUFBTSxTQUFDLE1BQU07Z0JBNUNULG9CQUFvQjtnQkFDcEIseUJBQXlCLHVCQTZDN0IsUUFBUSxZQUNSLE1BQU0sU0FBQyx5QkFBeUI7Z0JBN0M1QiwrQkFBK0IsdUJBK0NuQyxNQUFNLFNBQUMsK0JBQStCOzs7NkJBckN4QyxLQUFLO3NDQVVMLEtBQUs7c0JBU0wsS0FBSzt5QkFHTCxLQUFLO2dDQUdMLEtBQUs7O0lBNEZSLGdDQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0F4SFkseUJBQXlCOzs7SUFDcEMsZ0RBQW9COztJQVdwQix5REFBNkI7O0lBVTdCLHdDQUNZOztJQUVaLDJDQUNlOztJQUVmLGtEQUNzQjs7SUFDdEIsaURBQStCOztJQUMvQiw4Q0FBa0I7Ozs7O0lBRWhCLGdEQUErQjs7SUFDL0IsOENBQTJCOzs7OztJQUMzQiwyQ0FBbUM7O0lBQ25DLDBEQUFrRDs7Ozs7SUFDbEQsc0RBRW9EOzs7OztJQUNwRCw0REFDZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnbmd4LXdpbmRvdy10b2tlbic7XG5cbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlUGxhY2Vob2xkZXJDb21wb25lbnQgfSBmcm9tICcuLi9pbWFnZS1wbGFjZWhvbGRlci9pbWFnZS1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4uL3Byb2dyZXNzaXZlLWltYWdlLWxvYWRlci9wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IGlzUGljdHVyZUVsZW1lbnQsIGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGlzIGFuIGltYWdlIGVsZW1lbnRcbiAgc2VsZWN0b3I6ICdpbWdbbmd4UHJvZ3Jlc3NpdmVJbWFnZV0sIHNvdXJjZVtuZ3hQcm9ncmVzc2l2ZUltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NpdmVJbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgX2ltYWdlUmF0aW86IG51bWJlcjtcbiAgLy8gdG8gY3JlYXRlIGEgcGxhY2Vob2xkZXIgYmVmb3JlIGZpbmlzaCBsb2FkaW5nIHRoZSByZWFsIGltYWdlIHRvIGF2b2lkIHJlZmxvd1xuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VSYXRpbyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW1hZ2VSYXRpbyA9IHZhbHVlO1xuICB9XG4gIGdldCBpbWFnZVJhdGlvKCkge1xuICAgIHJldHVybiB0aGlzLl9pbWFnZVJhdGlvIHx8IHRoaXMuX1Byb2dyZXNzaXZlSW1hZ2VMb2FkZXIuaW1hZ2VSYXRpbztcbiAgfVxuXG4gIC8vIGEgbG9hZGluZyBpbWFnZSBzaG93aW5nIGJlZm9yZSB0aGUgcmVhbCBpbWFnZSBpcyBsb2FkZWRcbiAgX3BsYWNlaG9sZGVySW1hZ2VTcmM6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IHBsYWNlaG9sZGVySW1hZ2VTcmModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVySW1hZ2VTcmMgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwbGFjZWhvbGRlckltYWdlU3JjKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVySW1hZ2VTcmMgfHwgdGhpcy5fUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlci5wbGFjZWhvbGRlckltYWdlU3JjO1xuICB9XG5cbiAgQElucHV0KClcbiAgc3JjOiBzdHJpbmc7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KClcbiAgc3Jjc2V0OiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgbm9QbGFjZWhvbGRlciA9IGZhbHNlO1xuICBpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGlzT2JzZXJ2ZSA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9FbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBfUmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW5kb3c6IGFueSxcbiAgICBwdWJsaWMgX0NvbmZpZ3VyYXRpb25TZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoSW1hZ2VQbGFjZWhvbGRlckNvbXBvbmVudClcbiAgICBwcml2YXRlIF9JbWFnZVBsYWNlaG9sZGVyOiBJbWFnZVBsYWNlaG9sZGVyQ29tcG9uZW50LFxuICAgIEBJbmplY3QoUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlckNvbXBvbmVudClcbiAgICBwcml2YXRlIF9Qcm9ncmVzc2l2ZUltYWdlTG9hZGVyOiBQcm9ncmVzc2l2ZUltYWdlTG9hZGVyQ29tcG9uZW50XG4gICkge31cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZUVsZW1lbnQgPSB0aGlzLl9FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5zZXREYXRhU3JjKCdkYXRhLXNyYycsIHRoaXMuc3JjKTtcbiAgICB0aGlzLnNldERhdGFTcmMoJ2RhdGEtc3Jjc2V0JywgdGhpcy5zcmNzZXQpO1xuICAgIGlmICh0aGlzLl9Qcm9ncmVzc2l2ZUltYWdlTG9hZGVyLmludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAvLyBvbmx5IGltYWdlIGVsZW1lbnQgbmVlZCB0byBiZSBvYnNlcnZlIGFuZCBoYXZlIG9ubG9hZCBldmVudFxuICAgICAgaWYgKHRoaXMuaW1hZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICB0aGlzLmlzT2JzZXJ2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX1Byb2dyZXNzaXZlSW1hZ2VMb2FkZXIuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmltYWdlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5pbWFnZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoIXRoaXMuX0ltYWdlUGxhY2Vob2xkZXIgJiYgIXRoaXMubm9QbGFjZWhvbGRlcikge1xuICAgICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaG93IGltYWdlIGRpcmVjdGx5XG4gICAgICBsb2FkSW1hZ2UodGhpcy5fUmVuZGVyZXIsIHRoaXMuaW1hZ2VFbGVtZW50KTtcbiAgICAgIHRoaXMuaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgIH1cbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY2hhbmdlcy5zcmMgJiYgIWNoYW5nZXMuc3JjLmlzRmlyc3RDaGFuZ2UoKSAmJiB0aGlzLnNldERhdGFTcmMoJ2RhdGEtc3JjJywgdGhpcy5zcmMpO1xuICAgIGNoYW5nZXMuc3Jjc2V0ICYmXG4gICAgICAhY2hhbmdlcy5zcmNzZXQuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICB0aGlzLnNldERhdGFTcmMoJ2RhdGEtc3Jjc2V0JywgdGhpcy5zcmNzZXQpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5pc09ic2VydmUgJiZcbiAgICAgICgoY2hhbmdlcy5zcmMgJiYgIWNoYW5nZXMuc3JjLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgICAgKGNoYW5nZXMuc3Jjc2V0ICYmICFjaGFuZ2VzLnNyY3NldC5pc0ZpcnN0Q2hhbmdlKCkpKVxuICAgICkge1xuICAgICAgdGhpcy5fUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlci5pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUodGhpcy5pbWFnZUVsZW1lbnQpO1xuICAgICAgdGhpcy5fUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlci5pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuaW1hZ2VFbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgc2V0RGF0YVNyYyhhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB2YWx1ZSAmJiB0aGlzLl9SZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5pbWFnZUVsZW1lbnQsIGF0dHIsIHZhbHVlKTtcbiAgfVxuXG4gIHNldFBsYWNlaG9sZGVyKCkge1xuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmltYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlcih0aGlzLmNyZWF0ZVBsYWNlaG9sZGVySW1hZ2UoKSk7XG4gICAgaWYgKGlzUGljdHVyZUVsZW1lbnQocGFyZW50RWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IHBpY3R1cmVQYXJlbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICB0aGlzLmluc2VydFBsYWNlaG9sZGVyKHBpY3R1cmVQYXJlbnQsIHBhcmVudEVsZW1lbnQsIHBsYWNlaG9sZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnNlcnRQbGFjZWhvbGRlcihwYXJlbnRFbGVtZW50LCB0aGlzLmltYWdlRWxlbWVudCwgcGxhY2Vob2xkZXIpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydFBsYWNlaG9sZGVyKFxuICAgIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGltYWdlUGljdHVyZTogSFRNTEVsZW1lbnQsXG4gICAgcGxhY2Vob2xkZXI6IEhUTUxFbGVtZW50XG4gICkge1xuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBpbWFnZVBpY3R1cmUpO1xuICAgIHBsYWNlaG9sZGVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBgJHsxMDAgLyB0aGlzLmltYWdlUmF0aW99JWA7XG4gICAgcGxhY2Vob2xkZXIuYXBwZW5kQ2hpbGQoaW1hZ2VQaWN0dXJlKTtcbiAgfVxuXG4gIGNyZWF0ZVBsYWNlaG9sZGVyKHBsYWNlaG9sZGVySW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQoJ25neC1pbWFnZS1wbGFjZWhvbGRlcicpO1xuICAgIHBsYWNlaG9sZGVyLmFwcGVuZENoaWxkKHBsYWNlaG9sZGVySW1hZ2UpO1xuICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgfVxuXG4gIGNyZWF0ZVBsYWNlaG9sZGVySW1hZ2UoKSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmNsYXNzTGlzdC5hZGQoJ3BsYWNlaG9sZGVyLWxvYWRpbmctaW1hZ2UnKTtcbiAgICBpbWcuc3R5bGUuZmlsdGVyID0gdGhpcy5fUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlci5maWx0ZXI7XG4gICAgaW1nLnNyYyA9IHRoaXMucGxhY2Vob2xkZXJJbWFnZVNyYztcbiAgICByZXR1cm4gaW1nO1xuICB9XG59XG4iXX0=