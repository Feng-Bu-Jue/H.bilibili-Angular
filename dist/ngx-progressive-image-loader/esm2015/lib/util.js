/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} window
 * @return {?}
 */
export function isSupportIntersectionObserver(window) {
    return (window &&
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype);
}
/**
 * @param {?} element
 * @return {?}
 */
export function isImagePicture(element) {
    return element instanceof HTMLImageElement || element instanceof HTMLPictureElement;
}
/**
 * @param {?} renderer
 * @param {?} attribute
 * @param {?} element
 * @return {?}
 */
export function setAttribute(renderer, attribute, element) {
    renderer.setAttribute(element, attribute, element.dataset[attribute]);
    // maybe doesn't matter
    // renderer.removeAttribute(element, 'data-' + attribute);
}
/**
 * @param {?} element
 * @return {?}
 */
export function isPictureElement(element) {
    return element.nodeName === 'PICTURE';
}
/**
 * @param {?} renderer
 * @param {?} image
 * @return {?}
 */
export function loadImage(renderer, image) {
    if (isPictureElement(image.parentElement)) {
        /** @type {?} */
        const sourceElms = image.parentElement.children;
        for (let index = 0; index < sourceElms.length; index++) {
            /** @type {?} */
            const element = sourceElms[index];
            if (element instanceof HTMLSourceElement) {
                setAttribute(renderer, 'srcset', element);
            }
            else if (element instanceof HTMLImageElement) {
                setAttribute(renderer, 'src', element);
            }
        }
    }
    else {
        if (image.dataset.src) {
            setAttribute(renderer, 'src', image);
        }
        if (image.dataset.srcset) {
            setAttribute(renderer, 'srcset', image);
        }
    }
}
/**
 * @param {?} window
 * @return {?}
 */
export function isSpider(window) {
    return ((window && !('onscroll' in window)) ||
        /(gle|ing|ro)bot|crawl|spider/i.test(window.navigator.userAgent));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wcm9ncmVzc2l2ZS1pbWFnZS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxNQUFNO0lBQ2xELE9BQU8sQ0FDTCxNQUFNO1FBQ04sc0JBQXNCLElBQUksTUFBTTtRQUNoQywyQkFBMkIsSUFBSSxNQUFNO1FBQ3JDLG1CQUFtQixJQUFJLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQ2xFLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsT0FBb0I7SUFDakQsT0FBTyxPQUFPLFlBQVksZ0JBQWdCLElBQUksT0FBTyxZQUFZLGtCQUFrQixDQUFDO0FBQ3RGLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUMxQixRQUFtQixFQUNuQixTQUFpQixFQUNqQixPQUE2QztJQUU3QyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLHVCQUF1QjtJQUN2QiwwREFBMEQ7QUFDNUQsQ0FBQzs7Ozs7QUFDRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBb0I7SUFDbkQsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztBQUN4QyxDQUFDOzs7Ozs7QUFDRCxNQUFNLFVBQVUsU0FBUyxDQUFDLFFBQW1CLEVBQUUsS0FBdUI7SUFDcEUsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7O2NBQ25DLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVE7UUFDL0MsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7O2tCQUNoRCxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNqQyxJQUFJLE9BQU8sWUFBWSxpQkFBaUIsRUFBRTtnQkFDeEMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDM0M7aUJBQU0sSUFBSSxPQUFPLFlBQVksZ0JBQWdCLEVBQUU7Z0JBQzlDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7S0FDRjtTQUFNO1FBQ0wsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNyQixZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDeEIsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7S0FDRjtBQUNILENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFNO0lBQzdCLE9BQU8sQ0FDTCxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLCtCQUErQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUNqRSxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdXBwb3J0SW50ZXJzZWN0aW9uT2JzZXJ2ZXIod2luZG93KSB7XG4gIHJldHVybiAoXG4gICAgd2luZG93ICYmXG4gICAgJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cgJiZcbiAgICAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeScgaW4gd2luZG93ICYmXG4gICAgJ2ludGVyc2VjdGlvblJhdGlvJyBpbiB3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeS5wcm90b3R5cGVcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW1hZ2VQaWN0dXJlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFBpY3R1cmVFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cmlidXRlKFxuICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICBhdHRyaWJ1dGU6IHN0cmluZyxcbiAgZWxlbWVudDogSFRNTEltYWdlRWxlbWVudCB8IEhUTUxTb3VyY2VFbGVtZW50XG4pIHtcbiAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZSwgZWxlbWVudC5kYXRhc2V0W2F0dHJpYnV0ZV0pO1xuICAvLyBtYXliZSBkb2Vzbid0IG1hdHRlclxuICAvLyByZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtJyArIGF0dHJpYnV0ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNQaWN0dXJlRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ1BJQ1RVUkUnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShyZW5kZXJlcjogUmVuZGVyZXIyLCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICBpZiAoaXNQaWN0dXJlRWxlbWVudChpbWFnZS5wYXJlbnRFbGVtZW50KSkge1xuICAgIGNvbnN0IHNvdXJjZUVsbXMgPSBpbWFnZS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzb3VyY2VFbG1zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHNvdXJjZUVsbXNbaW5kZXhdO1xuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU291cmNlRWxlbWVudCkge1xuICAgICAgICBzZXRBdHRyaWJ1dGUocmVuZGVyZXIsICdzcmNzZXQnLCBlbGVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgc2V0QXR0cmlidXRlKHJlbmRlcmVyLCAnc3JjJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChpbWFnZS5kYXRhc2V0LnNyYykge1xuICAgICAgc2V0QXR0cmlidXRlKHJlbmRlcmVyLCAnc3JjJywgaW1hZ2UpO1xuICAgIH1cbiAgICBpZiAoaW1hZ2UuZGF0YXNldC5zcmNzZXQpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShyZW5kZXJlciwgJ3NyY3NldCcsIGltYWdlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3BpZGVyKHdpbmRvdykge1xuICByZXR1cm4gKFxuICAgICh3aW5kb3cgJiYgISgnb25zY3JvbGwnIGluIHdpbmRvdykpIHx8XG4gICAgLyhnbGV8aW5nfHJvKWJvdHxjcmF3bHxzcGlkZXIvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICApO1xufVxuIl19