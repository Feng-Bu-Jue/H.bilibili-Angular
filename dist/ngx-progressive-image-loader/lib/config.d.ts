import { InjectionToken } from '@angular/core';
export interface IImageLoaderOptions extends IntersectionObserverInit {
    placeholderImageSrc?: string;
    imageRatio: number;
    filter: string;
}
export declare const IMAGE_LOADER_CONFIG_TOKEN: InjectionToken<IImageLoaderOptions>;
export declare const DEFAULT_IMAGE_LOADER_OPTIONS: IImageLoaderOptions;
