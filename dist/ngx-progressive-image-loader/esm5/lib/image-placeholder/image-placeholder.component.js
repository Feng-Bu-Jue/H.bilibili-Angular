/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
var ImagePlaceholderComponent = /** @class */ (function () {
    function ImagePlaceholderComponent(sanitizer, _ProgressiveImageLoader) {
        this.sanitizer = sanitizer;
        this._ProgressiveImageLoader = _ProgressiveImageLoader;
        this.class = 'ngx-image-placeholder';
    }
    Object.defineProperty(ImagePlaceholderComponent.prototype, "placeHolder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitizer.bypassSecurityTrustStyle("padding-bottom: " + 100 / (this.imageRatio || this._ProgressiveImageLoader.imageRatio) + "%;");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagePlaceholderComponent.prototype, "imageFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitizer.bypassSecurityTrustStyle("" + this._ProgressiveImageLoader.filter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagePlaceholderComponent.prototype, "safeLoadingImage", {
        get: /**
         * @return {?}
         */
        function () {
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
        { type: Component, args: [{
                    selector: 'ngx-image-placeholder',
                    template: "\n    <img class=\"placeholder-loading-image\" [src]=\"safeLoadingImage\" [style.filter]=\"imageFilter\" />\n    <ng-content></ng-content>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ImagePlaceholderComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ProgressiveImageLoaderComponent }
    ]; };
    ImagePlaceholderComponent.propDecorators = {
        class: [{ type: HostBinding, args: ['class',] }],
        placeHolder: [{ type: HostBinding, args: ['style',] }],
        imageRatio: [{ type: Input }],
        placeholderImageSrc: [{ type: Input }]
    };
    return ImagePlaceholderComponent;
}());
export { ImagePlaceholderComponent };
if (false) {
    /** @type {?} */
    ImagePlaceholderComponent.prototype.class;
    /** @type {?} */
    ImagePlaceholderComponent.prototype.imageRatio;
    /** @type {?} */
    ImagePlaceholderComponent.prototype.placeholderImageSrc;
    /**
     * @type {?}
     * @private
     */
    ImagePlaceholderComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    ImagePlaceholderComponent.prototype._ProgressiveImageLoader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS1wbGFjZWhvbGRlci9pbWFnZS1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFFcEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFFakg7SUFtQ0UsbUNBQ1UsU0FBdUIsRUFDdkIsdUJBQXdEO1FBRHhELGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFpQztRQTNCbEUsVUFBSyxHQUFHLHVCQUF1QixDQUFDO0lBNEI3QixDQUFDO0lBM0JKLHNCQUNJLGtEQUFXOzs7O1FBRGY7WUFFRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQzVDLHFCQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsT0FBSSxDQUMxRixDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFTRCxzQkFBSSxrREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEtBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQVEsQ0FBQyxDQUFDO1FBQzNGLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdURBQWdCOzs7O1FBQXBCO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUMxQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUM3RSxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7Ozs7SUFPRCw0Q0FBUTs7O0lBQVIsY0FBWSxDQUFDOztnQkF4Q2QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxnSkFHVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBWFEsWUFBWTtnQkFFWiwrQkFBK0I7Ozt3QkFXckMsV0FBVyxTQUFDLE9BQU87OEJBRW5CLFdBQVcsU0FBQyxPQUFPOzZCQVFuQixLQUFLO3NDQUdMLEtBQUs7O0lBbUJSLGdDQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7U0FqQ1kseUJBQXlCOzs7SUFDcEMsMENBQ2dDOztJQVNoQywrQ0FDbUI7O0lBRW5CLHdEQUM0Qjs7Ozs7SUFhMUIsOENBQStCOzs7OztJQUMvQiw0REFBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4uL3Byb2dyZXNzaXZlLWltYWdlLWxvYWRlci9wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWltYWdlLXBsYWNlaG9sZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW1nIGNsYXNzPVwicGxhY2Vob2xkZXItbG9hZGluZy1pbWFnZVwiIFtzcmNdPVwic2FmZUxvYWRpbmdJbWFnZVwiIFtzdHlsZS5maWx0ZXJdPVwiaW1hZ2VGaWx0ZXJcIiAvPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VQbGFjZWhvbGRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBjbGFzcyA9ICduZ3gtaW1hZ2UtcGxhY2Vob2xkZXInO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlJylcbiAgZ2V0IHBsYWNlSG9sZGVyKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGBwYWRkaW5nLWJvdHRvbTogJHsxMDAgLyAodGhpcy5pbWFnZVJhdGlvIHx8IHRoaXMuX1Byb2dyZXNzaXZlSW1hZ2VMb2FkZXIuaW1hZ2VSYXRpbyl9JTtgXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRvIGNyZWF0ZSBhIHBsYWNlaG9sZGVyIGJlZm9yZSBmaW5pc2ggbG9hZGluZyB0aGUgcmVhbCBpbWFnZSB0byBhdm9pZCByZWZsb3dcbiAgQElucHV0KClcbiAgaW1hZ2VSYXRpbzogbnVtYmVyO1xuICAvLyBhIGxvYWRpbmcgaW1hZ2Ugc2hvd2luZyBiZWZvcmUgdGhlIHJlYWwgaW1hZ2UgaXMgbG9hZGVkXG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVySW1hZ2VTcmM6IHN0cmluZztcblxuICBnZXQgaW1hZ2VGaWx0ZXIoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGAke3RoaXMuX1Byb2dyZXNzaXZlSW1hZ2VMb2FkZXIuZmlsdGVyfWApO1xuICB9XG5cbiAgZ2V0IHNhZmVMb2FkaW5nSW1hZ2UoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJJbWFnZVNyYyB8fCB0aGlzLl9Qcm9ncmVzc2l2ZUltYWdlTG9hZGVyLnBsYWNlaG9sZGVySW1hZ2VTcmNcbiAgICApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9Qcm9ncmVzc2l2ZUltYWdlTG9hZGVyOiBQcm9ncmVzc2l2ZUltYWdlTG9hZGVyQ29tcG9uZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpIHt9XG59XG4iXX0=