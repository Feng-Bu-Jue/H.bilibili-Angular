/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { DEFAULT_IMAGE_LOADER_OPTIONS, IMAGE_LOADER_CONFIG_TOKEN } from './config';
export class ConfigurationService {
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
if (false) {
    /** @type {?} */
    ConfigurationService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9jb25maWd1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFDTCw0QkFBNEIsRUFFNUIseUJBQXlCLEVBQzFCLE1BQU0sVUFBVSxDQUFDO0FBR2xCLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFHL0IsWUFBK0MsT0FBNEI7UUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxNQUEyQjtRQUNuQyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLHFCQUFRLDRCQUE0QixFQUFLLE1BQU0sQ0FBRSxDQUFDO1NBQzlEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUE0QixDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7O1lBZEYsVUFBVTs7Ozs0Q0FJSSxNQUFNLFNBQUMseUJBQXlCOzs7O0lBRjdDLHNDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBERUZBVUxUX0lNQUdFX0xPQURFUl9PUFRJT05TLFxuICBJSW1hZ2VMb2FkZXJPcHRpb25zLFxuICBJTUFHRV9MT0FERVJfQ09ORklHX1RPS0VOXG59IGZyb20gJy4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25TZXJ2aWNlIHtcbiAgY29uZmlnOiBJSW1hZ2VMb2FkZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSU1BR0VfTE9BREVSX0NPTkZJR19UT0tFTikgb3B0aW9uczogSUltYWdlTG9hZGVyT3B0aW9ucykge1xuICAgIHRoaXMuc2V0Q29uZmlnKG9wdGlvbnMpO1xuICB9XG5cbiAgc2V0Q29uZmlnKGNvbmZpZzogSUltYWdlTG9hZGVyT3B0aW9ucykge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0geyAuLi5ERUZBVUxUX0lNQUdFX0xPQURFUl9PUFRJT05TLCAuLi5jb25maWcgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcgPSBERUZBVUxUX0lNQUdFX0xPQURFUl9PUFRJT05TO1xuICAgIH1cbiAgfVxufVxuIl19