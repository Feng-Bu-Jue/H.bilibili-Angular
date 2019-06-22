import { tap, map } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiliBiliProtocal } from 'src/app/bilibiliApi/models/bilibiliProtocal';
import { ServiceError } from '../error/serviceError';


export class UniversalInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({
      setHeaders: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true
    });
    return next
      .handle(req).pipe(
        map(x => {
          if (x instanceof BiliBiliProtocal) {
            if (x.code != 0)
              throw new ServiceError(x.code, x.message);
          }
          return x;
        })
      );
  }
}
