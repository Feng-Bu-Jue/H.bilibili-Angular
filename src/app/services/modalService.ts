import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Animation, ModalOptions } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modalController: ModalController) { }

    public fromDefaultOtion(options: ModalOptions):ModalOptions
    {
        let defaultOptions = {
            backdropDismiss: true,
            enterAnimation: this.enterAnimation,
            leaveAnimation: this.leaveAnimation
        }
        for (let key in defaultOptions) {
            if (!options[key]) {
                options[key] = defaultOptions[key]
            }
        }
        return options;
    }

    enterAnimation(animation: Animation, baseEl: HTMLElement) {
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

    leaveAnimation(animation: Animation, baseEl: HTMLElement) {
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

}