import { Animation } from '@ionic/core';

export  function  formatViewCount(view_count: number): string {
    let result = '';
    let viewCountStr = view_count.toString();
    if (view_count > 10000) {
        let interPart = viewCountStr.substring(0, viewCountStr.length - 4);
        let decimalPart = viewCountStr.substring(viewCountStr.length - 4, viewCountStr.length - 3)
        return `${interPart}.${decimalPart}万`;
    }
    else {
        result = viewCountStr;
    }
    return result;
}

export function getImgItemW(count: number): string {
    let wClass: string;
    let wClassMap: { [name: string]: () => boolean } =
    {
        "w-1": () => {
            return count == 1;
        },
        "w-2": () => {
            return count == 2 || count == 4;
        },
        "w-3": () => {
            return true;
        }
    }
    Object.keys(wClassMap).every((key, index) => {
        if (wClassMap[key]()) {
            wClass = key;
            return false;
        }
        return true;
    })
    return wClass;
}

export function imgViewEnterAnimation(animation: Animation, baseEl: HTMLElement) {
    const baseAnimation = new animation();

    const backdropAnimation = new animation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new animation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
        .fromTo('opacity', 0.01, 1)
        .duration(280)
        .fromTo('translateY', '40px', '0px')
        .duration(0);

    backdropAnimation.fromTo('opacity', 0.01, 0.32);

    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(280)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation);
}

export function imgViewLeaveAnimation(animation: Animation, baseEl: HTMLElement) {
    const baseAnimation = new animation();

    const backdropAnimation = new animation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new animation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
        .fromTo('opacity', 0.99, 0)
        .duration(280)
        .fromTo('translateY', '0px', '40px')
        .duration(0);

    backdropAnimation.fromTo('opacity', 0.32, 0);

    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(280)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation);
}