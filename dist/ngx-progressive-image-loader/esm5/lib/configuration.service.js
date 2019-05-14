/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { DEFAULT_IMAGE_LOADER_OPTIONS, IMAGE_LOADER_CONFIG_TOKEN } from './config';
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
            this.config = tslib_1.__assign({}, DEFAULT_IMAGE_LOADER_OPTIONS, config);
        }
        else {
            this.config = DEFAULT_IMAGE_LOADER_OPTIONS;
        }
    };
    ConfigurationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigurationService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [IMAGE_LOADER_CONFIG_TOKEN,] }] }
    ]; };
    return ConfigurationService;
}());
export { ConfigurationService };
if (false) {
    /** @type {?} */
    ConfigurationService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXByb2dyZXNzaXZlLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9jb25maWd1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQ0wsNEJBQTRCLEVBRTVCLHlCQUF5QixFQUMxQixNQUFNLFVBQVUsQ0FBQztBQUVsQjtJQUlFLDhCQUErQyxPQUE0QjtRQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsd0NBQVM7Ozs7SUFBVCxVQUFVLE1BQTJCO1FBQ25DLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sd0JBQVEsNEJBQTRCLEVBQUssTUFBTSxDQUFFLENBQUM7U0FDOUQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsNEJBQTRCLENBQUM7U0FDNUM7SUFDSCxDQUFDOztnQkFkRixVQUFVOzs7O2dEQUlJLE1BQU0sU0FBQyx5QkFBeUI7O0lBVy9DLDJCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZFksb0JBQW9COzs7SUFDL0Isc0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIERFRkFVTFRfSU1BR0VfTE9BREVSX09QVElPTlMsXG4gIElJbWFnZUxvYWRlck9wdGlvbnMsXG4gIElNQUdFX0xPQURFUl9DT05GSUdfVE9LRU5cbn0gZnJvbSAnLi9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuICBjb25maWc6IElJbWFnZUxvYWRlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChJTUFHRV9MT0FERVJfQ09ORklHX1RPS0VOKSBvcHRpb25zOiBJSW1hZ2VMb2FkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5zZXRDb25maWcob3B0aW9ucyk7XG4gIH1cblxuICBzZXRDb25maWcoY29uZmlnOiBJSW1hZ2VMb2FkZXJPcHRpb25zKSB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5jb25maWcgPSB7IC4uLkRFRkFVTFRfSU1BR0VfTE9BREVSX09QVElPTlMsIC4uLmNvbmZpZyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZyA9IERFRkFVTFRfSU1BR0VfTE9BREVSX09QVElPTlM7XG4gICAgfVxuICB9XG59XG4iXX0=