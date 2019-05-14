import { IImageLoaderOptions } from './config';
export declare class ConfigurationService {
    config: IImageLoaderOptions;
    constructor(options: IImageLoaderOptions);
    setConfig(config: IImageLoaderOptions): void;
}
