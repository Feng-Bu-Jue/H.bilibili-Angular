import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
export declare class ProgressiveImageLoaderComponent implements OnInit, OnDestroy {
    _Renderer: Renderer2;
    _ConfigurationService: ConfigurationService;
    private platformId;
    private window;
    imageRatio: number;
    filter: string;
    placeholderImageSrc: string;
    intersectionObserver: IntersectionObserver;
    constructor(element: ElementRef, _Renderer: Renderer2, _ConfigurationService: ConfigurationService, platformId: any, window: any);
    ngOnInit(): void;
    onIntersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    onImageAppearsInViewport(image: HTMLImageElement, observer: IntersectionObserver): void;
    ngOnDestroy(): void;
}
