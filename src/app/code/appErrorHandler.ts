import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../services/toastService';
import { ServiceError } from './error/serviceError';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(
        private toastService: ToastService
    ) {
    }

    async handleError(error: any): Promise<void> {
        if (error.rejection)//for promise reject error
            error = error.rejection

        if (error instanceof ServiceError) {
            await this.toastService.present(error.message)
        }
        console.error(error)
    }
}
