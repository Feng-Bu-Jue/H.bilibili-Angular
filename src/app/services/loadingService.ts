import { ToastController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private loadingController: LoadingController) { }

    async present(message: string) {
        let loading = await this.loadingController.create({
            message: message
        });
        await loading.present();
    }

    async presentWithAction(message: string, action: () => Promise<void>) {
        let loading = await this.loadingController.create({
            message: message
        });
        await loading.present();
        await action()
        await this.dismiss();
    }

    dismiss() {
        this.loadingController.dismiss();
    }

}