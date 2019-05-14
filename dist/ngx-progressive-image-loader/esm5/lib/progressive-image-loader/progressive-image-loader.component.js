/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { ConfigurationService } from '../configuration.service';
import { isSpider, isSupportIntersectionObserver, loadImage } from '../util';
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
        entries.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            return entry.isIntersecting &&
                _this.onImageAppearsInViewport((/** @type {?} */ (entry.target)), observer);
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
        { type: Component, args: [{
                    selector: 'ngx-progressive-image-loader',
                    template: "\n    <ng-content></ng-content>\n  "
                }] }
    ];
    /** @nocollapse */
    ProgressiveImageLoaderComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ConfigurationService },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] }
    ]; };
    ProgressiveImageLoaderComponent.propDecorators = {
        imageRatio: [{ type: Input }],
        filter: [{ type: Input }],
        placeholderImageSrc: [{ type: Input }]
    };
    return ProgressiveImageLoaderComponent;
}());
export { ProgressiveImageLoaderComponent };
if (false) {
    /** @type {?} */
    ProgressiveImageLoaderComponent.prototype.imageRatio;
    /** @type {?} */
    ProgressiveImageLoaderComponent.prototype.filter;
    /** @type {?} */
    ProgressiveImageLoaderComponent.prototype.placeholderImageSrc;
    /** @type {?} */
    ProgressiveImageLoaderComponent.prototype.intersectionObserver;
    /** @type {?} */
    ProgressiveImageLoaderComponent.prototype._Renderer;
    /** @type {?} */
    ProgressiveImageLoaderComponent.prototype._ConfigurationService;
    /**
     * @type {?}
     * @private
     */
    ProgressiveImageLoaderComponent.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    ProgressiveImageLoaderComponent.prototype.window;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvcHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyL3Byb2dyZXNzaXZlLWltYWdlLWxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSw2QkFBNkIsRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFN0U7SUFrQkUseUNBQ0UsT0FBbUIsRUFDWixTQUFvQixFQUNwQixxQkFBMkMsRUFDckIsVUFBZSxFQUNwQixNQUFXO1FBSDVCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQUs7SUFDbEMsQ0FBQzs7OztJQUVKLGtEQUFROzs7SUFBUjtRQUNFLElBQ0UsNkJBQTZCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDbEM7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNoRTtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3hEO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7YUFDbEY7WUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FDbEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FDbEMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsK0RBQXFCOzs7OztJQUFyQixVQUFzQixPQUFvQyxFQUFFLFFBQThCO1FBQTFGLGlCQU1DO1FBTEMsT0FBTyxDQUFDLE9BQU87Ozs7UUFDYixVQUFBLEtBQUs7WUFDSCxPQUFBLEtBQUssQ0FBQyxjQUFjO2dCQUNwQixLQUFJLENBQUMsd0JBQXdCLENBQUMsbUJBQUEsS0FBSyxDQUFDLE1BQU0sRUFBb0IsRUFBRSxRQUFRLENBQUM7UUFEekUsQ0FDeUUsRUFDNUUsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELGtFQUF3Qjs7Ozs7SUFBeEIsVUFBeUIsS0FBdUIsRUFBRSxRQUE4QjtRQUM5RSxvQ0FBb0M7UUFDcEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQscURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0RSxDQUFDOztnQkFqRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRSxxQ0FFVDtpQkFDRjs7OztnQkFsQkMsVUFBVTtnQkFNVixTQUFTO2dCQUlGLG9CQUFvQjtnREF5QnhCLE1BQU0sU0FBQyxXQUFXO2dEQUNsQixNQUFNLFNBQUMsTUFBTTs7OzZCQWZmLEtBQUs7eUJBR0wsS0FBSztzQ0FHTCxLQUFLOztJQW9EUixzQ0FBQztDQUFBLEFBbEVELElBa0VDO1NBNURZLCtCQUErQjs7O0lBRTFDLHFEQUNtQjs7SUFFbkIsaURBQ2U7O0lBRWYsOERBQzRCOztJQUM1QiwrREFBMkM7O0lBSXpDLG9EQUEyQjs7SUFDM0IsZ0VBQWtEOzs7OztJQUNsRCxxREFBNEM7Ozs7O0lBQzVDLGlEQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICduZ3gtd2luZG93LXRva2VuJztcblxuaW1wb3J0IHsgQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNTcGlkZXIsIGlzU3VwcG9ydEludGVyc2VjdGlvbk9ic2VydmVyLCBsb2FkSW1hZ2UgfSBmcm9tICcuLi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzaXZlSW1hZ2VMb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIGRlZmluZSB0aGUgcGxhY2Vob2xkZXIgaGVpZ2h0IGZvciBhbGwgaW1hZ2VzIGluc2lkZSB0aGlzIGNvbXBvbmVudHNcbiAgQElucHV0KClcbiAgaW1hZ2VSYXRpbzogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGZpbHRlcjogc3RyaW5nO1xuICAvLyB0aGUgc3JjIG9mIGxvYWRpbmcgaW1hZ2VcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXJJbWFnZVNyYzogc3RyaW5nO1xuICBpbnRlcnNlY3Rpb25PYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgX1JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIF9Db25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgQEluamVjdChXSU5ET1cpIHByaXZhdGUgd2luZG93OiBhbnlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChcbiAgICAgIGlzU3VwcG9ydEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMud2luZG93KSAmJlxuICAgICAgIWlzU3BpZGVyKHRoaXMud2luZG93KSAmJlxuICAgICAgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKVxuICAgICkge1xuICAgICAgaWYgKCF0aGlzLmltYWdlUmF0aW8pIHtcbiAgICAgICAgdGhpcy5pbWFnZVJhdGlvID0gdGhpcy5fQ29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlnLmltYWdlUmF0aW87XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzLl9Db25maWd1cmF0aW9uU2VydmljZS5jb25maWcuZmlsdGVyO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVySW1hZ2VTcmMpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckltYWdlU3JjID0gdGhpcy5fQ29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlnLnBsYWNlaG9sZGVySW1hZ2VTcmM7XG4gICAgICB9XG4gICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgICB0aGlzLm9uSW50ZXJzZWN0aW9uQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aGlzLl9Db25maWd1cmF0aW9uU2VydmljZS5jb25maWdcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25JbnRlcnNlY3Rpb25DaGFuZ2VkKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSwgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgZW50cmllcy5mb3JFYWNoKFxuICAgICAgZW50cnkgPT5cbiAgICAgICAgZW50cnkuaXNJbnRlcnNlY3RpbmcgJiZcbiAgICAgICAgdGhpcy5vbkltYWdlQXBwZWFyc0luVmlld3BvcnQoZW50cnkudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQsIG9ic2VydmVyKVxuICAgICk7XG4gIH1cblxuICBvbkltYWdlQXBwZWFyc0luVmlld3BvcnQoaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgIC8vIFN0b3Agb2JzZXJ2aW5nIHRoZSBjdXJyZW50IHRhcmdldFxuICAgIG9ic2VydmVyLnVub2JzZXJ2ZShpbWFnZSk7XG4gICAgbG9hZEltYWdlKHRoaXMuX1JlbmRlcmVyLCBpbWFnZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyICYmIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9XG59XG4iXX0=