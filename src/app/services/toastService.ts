import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) { }

    async present(message: string) {
        const toast = await this.toastController.create({
            message: message,
            position: 'bottom',
            duration: 1500,
            cssClass: 'toast'
        });
        toast.present();
    }

    dismiss() {
        this.toastController.dismiss();
    }
}