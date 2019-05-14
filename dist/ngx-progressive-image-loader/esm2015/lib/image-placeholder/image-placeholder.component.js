/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
export class ImagePlaceholderComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS1wbGFjZWhvbGRlci9pbWFnZS1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFFcEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFVakgsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUEyQnBDLFlBQ1UsU0FBdUIsRUFDdkIsdUJBQXdEO1FBRHhELGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFpQztRQTNCbEUsVUFBSyxHQUFHLHVCQUF1QixDQUFDO0lBNEI3QixDQUFDOzs7O0lBM0JKLElBQ0ksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FDNUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzFGLENBQUM7SUFDSixDQUFDOzs7O0lBU0QsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0YsQ0FBQzs7OztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FDMUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FDN0UsQ0FBQztJQUNKLENBQUM7Ozs7SUFPRCxRQUFRLEtBQUksQ0FBQzs7O1lBeENkLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7OztHQUdUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBWFEsWUFBWTtZQUVaLCtCQUErQjs7O29CQVdyQyxXQUFXLFNBQUMsT0FBTzswQkFFbkIsV0FBVyxTQUFDLE9BQU87eUJBUW5CLEtBQUs7a0NBR0wsS0FBSzs7OztJQWJOLDBDQUNnQzs7SUFTaEMsK0NBQ21COztJQUVuQix3REFDNEI7Ozs7O0lBYTFCLDhDQUErQjs7Ozs7SUFDL0IsNERBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IFByb2dyZXNzaXZlSW1hZ2VMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuLi9wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIvcHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1pbWFnZS1wbGFjZWhvbGRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGltZyBjbGFzcz1cInBsYWNlaG9sZGVyLWxvYWRpbmctaW1hZ2VcIiBbc3JjXT1cInNhZmVMb2FkaW5nSW1hZ2VcIiBbc3R5bGUuZmlsdGVyXT1cImltYWdlRmlsdGVyXCIgLz5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlUGxhY2Vob2xkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgY2xhc3MgPSAnbmd4LWltYWdlLXBsYWNlaG9sZGVyJztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZScpXG4gIGdldCBwbGFjZUhvbGRlcigpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgcGFkZGluZy1ib3R0b206ICR7MTAwIC8gKHRoaXMuaW1hZ2VSYXRpbyB8fCB0aGlzLl9Qcm9ncmVzc2l2ZUltYWdlTG9hZGVyLmltYWdlUmF0aW8pfSU7YFxuICAgICk7XG4gIH1cblxuICAvLyB0byBjcmVhdGUgYSBwbGFjZWhvbGRlciBiZWZvcmUgZmluaXNoIGxvYWRpbmcgdGhlIHJlYWwgaW1hZ2UgdG8gYXZvaWQgcmVmbG93XG4gIEBJbnB1dCgpXG4gIGltYWdlUmF0aW86IG51bWJlcjtcbiAgLy8gYSBsb2FkaW5nIGltYWdlIHNob3dpbmcgYmVmb3JlIHRoZSByZWFsIGltYWdlIGlzIGxvYWRlZFxuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlckltYWdlU3JjOiBzdHJpbmc7XG5cbiAgZ2V0IGltYWdlRmlsdGVyKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgJHt0aGlzLl9Qcm9ncmVzc2l2ZUltYWdlTG9hZGVyLmZpbHRlcn1gKTtcbiAgfVxuXG4gIGdldCBzYWZlTG9hZGluZ0ltYWdlKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoXG4gICAgICB0aGlzLnBsYWNlaG9sZGVySW1hZ2VTcmMgfHwgdGhpcy5fUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlci5wbGFjZWhvbGRlckltYWdlU3JjXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBfUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlcjogUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlckNvbXBvbmVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIl19