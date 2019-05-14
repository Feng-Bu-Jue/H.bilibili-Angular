import { ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { ImagePlaceholderComponent } from '../image-placeholder/image-placeholder.component';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
export declare class ProgressiveImageDirective implements OnInit, OnChanges {
    private _ElementRef;
    _Renderer: Renderer2;
    private window;
    _ConfigurationService: ConfigurationService;
    private _ImagePlaceholder;
    private _ProgressiveImageLoader;
    _imageRatio: number;
    imageRatio: number;
    _placeholderImageSrc: string;
    placeholderImageSrc: string;
    src: string;
    srcset: string;
    noPlaceholder: boolean;
    imageElement: HTMLImageElement;
    isObserve: boolean;
    constructor(_ElementRef: ElementRef, _Renderer: Renderer2, window: any, _ConfigurationService: ConfigurationService, _ImagePlaceholder: ImagePlaceholderComponent, _ProgressiveImageLoader: ProgressiveImageLoaderComponent);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    setDataSrc(attr: string, value: string): void;
    setPlaceholder(): void;
    insertPlaceholder(parentElement: HTMLElement, imagePicture: HTMLElement, placeholder: HTMLElement): void;
    createPlaceholder(placeholderImage: HTMLImageElement): HTMLDivElement;
    createPlaceholderImage(): HTMLImageElement;
}
