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
export class NgxProgressiveImageLoaderModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL25neC1wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQXVCLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ2hILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7OztBQUU1RixNQUFNLFVBQVUsMkJBQTJCLENBQUMsT0FBNEI7SUFDdEUsT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFVRCxNQUFNLE9BQU8sK0JBQStCOzs7OztJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQTRCO1FBQ2hELE9BQU87WUFDTCxRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2dCQUN4RDtvQkFDRSxPQUFPLEVBQUUsb0JBQW9CO29CQUM3QixVQUFVLEVBQUUsMkJBQTJCO29CQUN2QyxJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDbEM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUF0QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFlBQVksRUFBRTtvQkFDWiwrQkFBK0I7b0JBQy9CLHlCQUF5QjtvQkFDekIseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQzthQUNqRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElJbWFnZUxvYWRlck9wdGlvbnMsIElNQUdFX0xPQURFUl9DT05GSUdfVE9LRU4gfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlUGxhY2Vob2xkZXJDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlLXBsYWNlaG9sZGVyL2ltYWdlLXBsYWNlaG9sZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9ncmVzc2l2ZUltYWdlTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIvcHJvZ3Jlc3NpdmUtaW1hZ2UtbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9ncmVzc2l2ZUltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9wcm9ncmVzc2l2ZS1pbWFnZS9wcm9ncmVzc2l2ZS1pbWFnZS5kaXJlY3RpdmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29uZmlndXJhdGlvblNlcnZpY2VGYWN0b3J5KG9wdGlvbnM6IElJbWFnZUxvYWRlck9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBDb25maWd1cmF0aW9uU2VydmljZShvcHRpb25zKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQcm9ncmVzc2l2ZUltYWdlTG9hZGVyQ29tcG9uZW50LFxuICAgIFByb2dyZXNzaXZlSW1hZ2VEaXJlY3RpdmUsXG4gICAgSW1hZ2VQbGFjZWhvbGRlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbUHJvZ3Jlc3NpdmVJbWFnZUxvYWRlckNvbXBvbmVudCwgUHJvZ3Jlc3NpdmVJbWFnZURpcmVjdGl2ZSwgSW1hZ2VQbGFjZWhvbGRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4UHJvZ3Jlc3NpdmVJbWFnZUxvYWRlck1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBJSW1hZ2VMb2FkZXJPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hQcm9ncmVzc2l2ZUltYWdlTG9hZGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogSU1BR0VfTE9BREVSX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogQ29uZmlndXJhdGlvblNlcnZpY2VGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtJTUFHRV9MT0FERVJfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19