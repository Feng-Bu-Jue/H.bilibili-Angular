import { ModuleWithProviders } from '@angular/core';
import { IImageLoaderOptions } from './config';
import { ConfigurationService } from './configuration.service';
export declare function ConfigurationServiceFactory(options: IImageLoaderOptions): ConfigurationService;
export declare class NgxProgressiveImageLoaderModule {
    static forRoot(config?: IImageLoaderOptions): ModuleWithProviders;
}
