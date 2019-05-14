/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { ConfigurationService } from '../configuration.service';
import { isSpider, isSupportIntersectionObserver, loadImage } from '../util';
export class ProgressiveImageLoaderComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvcHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyL3Byb2dyZXNzaXZlLWltYWdlLWxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSw2QkFBNkIsRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFRN0UsTUFBTSxPQUFPLCtCQUErQjs7Ozs7Ozs7SUFZMUMsWUFDRSxPQUFtQixFQUNaLFNBQW9CLEVBQ3BCLHFCQUEyQyxFQUNyQixVQUFlLEVBQ3BCLE1BQVc7UUFINUIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQ3JCLGVBQVUsR0FBVixVQUFVLENBQUs7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBSztJQUNsQyxDQUFDOzs7O0lBRUosUUFBUTtRQUNOLElBQ0UsNkJBQTZCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDbEM7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNoRTtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3hEO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7YUFDbEY7WUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FDbEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FDbEMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQscUJBQXFCLENBQUMsT0FBb0MsRUFBRSxRQUE4QjtRQUN4RixPQUFPLENBQUMsT0FBTzs7OztRQUNiLEtBQUssQ0FBQyxFQUFFLENBQ04sS0FBSyxDQUFDLGNBQWM7WUFDcEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLG1CQUFBLEtBQUssQ0FBQyxNQUFNLEVBQW9CLEVBQUUsUUFBUSxDQUFDLEVBQzVFLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCx3QkFBd0IsQ0FBQyxLQUF1QixFQUFFLFFBQThCO1FBQzlFLG9DQUFvQztRQUNwQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0RSxDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRTs7R0FFVDthQUNGOzs7O1lBbEJDLFVBQVU7WUFNVixTQUFTO1lBSUYsb0JBQW9COzRDQXlCeEIsTUFBTSxTQUFDLFdBQVc7NENBQ2xCLE1BQU0sU0FBQyxNQUFNOzs7eUJBZmYsS0FBSztxQkFHTCxLQUFLO2tDQUdMLEtBQUs7Ozs7SUFOTixxREFDbUI7O0lBRW5CLGlEQUNlOztJQUVmLDhEQUM0Qjs7SUFDNUIsK0RBQTJDOztJQUl6QyxvREFBMkI7O0lBQzNCLGdFQUFrRDs7Ozs7SUFDbEQscURBQTRDOzs7OztJQUM1QyxpREFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnbmd4LXdpbmRvdy10b2tlbic7XG5cbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGlzU3BpZGVyLCBpc1N1cHBvcnRJbnRlcnNlY3Rpb25PYnNlcnZlciwgbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2l2ZUltYWdlTG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyBkZWZpbmUgdGhlIHBsYWNlaG9sZGVyIGhlaWdodCBmb3IgYWxsIGltYWdlcyBpbnNpZGUgdGhpcyBjb21wb25lbnRzXG4gIEBJbnB1dCgpXG4gIGltYWdlUmF0aW86IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBmaWx0ZXI6IHN0cmluZztcbiAgLy8gdGhlIHNyYyBvZiBsb2FkaW5nIGltYWdlXG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVySW1hZ2VTcmM6IHN0cmluZztcbiAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIF9SZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHB1YmxpYyBfQ29uZmlndXJhdGlvblNlcnZpY2U6IENvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbmRvdzogYW55XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoXG4gICAgICBpc1N1cHBvcnRJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLndpbmRvdykgJiZcbiAgICAgICFpc1NwaWRlcih0aGlzLndpbmRvdykgJiZcbiAgICAgIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZClcbiAgICApIHtcbiAgICAgIGlmICghdGhpcy5pbWFnZVJhdGlvKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VSYXRpbyA9IHRoaXMuX0NvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZy5pbWFnZVJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy5fQ29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlnLmZpbHRlcjtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlckltYWdlU3JjKSB7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJJbWFnZVNyYyA9IHRoaXMuX0NvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZy5wbGFjZWhvbGRlckltYWdlU3JjO1xuICAgICAgfVxuICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAgICAgdGhpcy5vbkludGVyc2VjdGlvbkNoYW5nZWQuYmluZCh0aGlzKSxcbiAgICAgICAgdGhpcy5fQ29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlnXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uSW50ZXJzZWN0aW9uQ2hhbmdlZChlbnRyaWVzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10sIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgIGVudHJpZXMuZm9yRWFjaChcbiAgICAgIGVudHJ5ID0+XG4gICAgICAgIGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmXG4gICAgICAgIHRoaXMub25JbWFnZUFwcGVhcnNJblZpZXdwb3J0KGVudHJ5LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50LCBvYnNlcnZlcilcbiAgICApO1xuICB9XG5cbiAgb25JbWFnZUFwcGVhcnNJblZpZXdwb3J0KGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAvLyBTdG9wIG9ic2VydmluZyB0aGUgY3VycmVudCB0YXJnZXRcbiAgICBvYnNlcnZlci51bm9ic2VydmUoaW1hZ2UpO1xuICAgIGxvYWRJbWFnZSh0aGlzLl9SZW5kZXJlciwgaW1hZ2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlciAmJiB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxufVxuIl19