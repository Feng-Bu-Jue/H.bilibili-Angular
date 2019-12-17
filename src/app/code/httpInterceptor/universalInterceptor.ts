import { tap, map } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiliBiliProtocal } from 'src/app/bilibiliApi/models/bilibiliProtocal';
import { ServiceError } from '../error/serviceError';


export class UniversalInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq =req.clone({
      setHeaders: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: false
    });
    
    return next.handle(newReq)
  }
}
