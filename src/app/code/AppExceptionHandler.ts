import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppExceptionHandler implements ErrorHandler
{
    handleError(error: any): void {
       //logger.write(error/*format*/)
    }
}
