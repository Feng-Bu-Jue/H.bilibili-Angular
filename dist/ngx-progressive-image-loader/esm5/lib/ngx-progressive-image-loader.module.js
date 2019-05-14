/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { IMAGE_LOADER_CONFIG_TOKEN } from './config';
import { ConfigurationService } from './configuration.service';
import { ImagePlaceholderComponent } from './image-placeholder/image-placeholder.component';
import { ProgressiveImageLoaderComponent } from './progressive-image-loader/progressive-image-loader.component';
import { ProgressiveImageDirective } from './progressive-image/progressive-image.directive';
/**
 * @param {?} options
 * @return {?}
 */
export function ConfigurationServiceFactory(options) {
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
    return NgxProgressiveImageLoaderModule;
}());
export { NgxProgressiveImageLoaderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL25neC1wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQXVCLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ2hILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7OztBQUU1RixNQUFNLFVBQVUsMkJBQTJCLENBQUMsT0FBNEI7SUFDdEUsT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFDRDtJQUFBO0lBdUJBLENBQUM7Ozs7O0lBYmUsdUNBQU87Ozs7SUFBckIsVUFBc0IsTUFBNEI7UUFDaEQsT0FBTztZQUNMLFFBQVEsRUFBRSwrQkFBK0I7WUFDekMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3hEO29CQUNFLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFVBQVUsRUFBRSwyQkFBMkI7b0JBQ3ZDLElBQUksRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQXRCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsWUFBWSxFQUFFO3dCQUNaLCtCQUErQjt3QkFDL0IseUJBQXlCO3dCQUN6Qix5QkFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRSxDQUFDLCtCQUErQixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixDQUFDO2lCQUNqRzs7SUFlRCxzQ0FBQztDQUFBLEFBdkJELElBdUJDO1NBZFksK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUltYWdlTG9hZGVyT3B0aW9ucywgSU1BR0VfTE9BREVSX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW1hZ2VQbGFjZWhvbGRlckNvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UtcGxhY2Vob2xkZXIvaW1hZ2UtcGxhY2Vob2xkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzaXZlSW1hZ2VMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzaXZlLWltYWdlLWxvYWRlci9wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzaXZlSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL3Byb2dyZXNzaXZlLWltYWdlL3Byb2dyZXNzaXZlLWltYWdlLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25maWd1cmF0aW9uU2VydmljZUZhY3Rvcnkob3B0aW9uczogSUltYWdlTG9hZGVyT3B0aW9ucykge1xuICByZXR1cm4gbmV3IENvbmZpZ3VyYXRpb25TZXJ2aWNlKG9wdGlvbnMpO1xufVxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFByb2dyZXNzaXZlSW1hZ2VMb2FkZXJDb21wb25lbnQsXG4gICAgUHJvZ3Jlc3NpdmVJbWFnZURpcmVjdGl2ZSxcbiAgICBJbWFnZVBsYWNlaG9sZGVyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtQcm9ncmVzc2l2ZUltYWdlTG9hZGVyQ29tcG9uZW50LCBQcm9ncmVzc2l2ZUltYWdlRGlyZWN0aXZlLCBJbWFnZVBsYWNlaG9sZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hQcm9ncmVzc2l2ZUltYWdlTG9hZGVyTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IElJbWFnZUxvYWRlck9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neFByb2dyZXNzaXZlSW1hZ2VMb2FkZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBJTUFHRV9MT0FERVJfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBDb25maWd1cmF0aW9uU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0lNQUdFX0xPQURFUl9DT05GSUdfVE9LRU5dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=