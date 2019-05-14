import { OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
export declare class ImagePlaceholderComponent implements OnInit {
    private sanitizer;
    private _ProgressiveImageLoader;
    class: string;
    readonly placeHolder: SafeStyle;
    imageRatio: number;
    placeholderImageSrc: string;
    readonly imageFilter: SafeStyle;
    readonly safeLoadingImage: SafeStyle;
    constructor(sanitizer: DomSanitizer, _ProgressiveImageLoader: ProgressiveImageLoaderComponent);
    ngOnInit(): void;
}
