import { tap, map, catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { BiliBiliProtocal } from 'src/app/bilibiliApi/models/bilibiliProtocal';
import { ServiceError } from '../error/serviceError';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { UserState } from 'src/app/store/user.state';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/services/toastService';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private router: Router,
    private toastService: ToastService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let crsf_token = this.store.selectSnapshot(UserState.getToken);
    let params = { crsf_token };
    for (let i in params) if (!params[i]) delete params[i];//remove empty param
    let newReq = req.clone({
      setHeaders: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
      setParams: params
    });

    const httpEventSubject: Subject<HttpEvent<any>> = new Subject<HttpEvent<any>>();
    next.handle(newReq).subscribe(
      res => {
        switch (res.type) {
          case 4:
            this.HandleResponseEvent(<HttpResponse<BiliBiliProtocal<any>>>res, httpEventSubject)
            break;
        }
      },
      error => {
        let errorRes = <HttpErrorResponse>error
        let body: any = {};
        if (errorRes.headers.get('content-type') === 'application/json') {
          body = errorRes.error ? JSON.parse(errorRes.error) : {}
        }
        let httpResponse = new HttpResponse({
          headers: errorRes.headers,
          status: errorRes.status,
          body: body
        })
        this.HandleResponseEvent(httpResponse, httpEventSubject)
        httpEventSubject.error(error)
        httpEventSubject.complete();
      });

    return httpEventSubject;
  }

  protected async HandleResponseEvent(httpResponse: HttpResponse<BiliBiliProtocal<any>>, subject: Subject<HttpEvent<any>>) {
    if ([401, 403].includes(httpResponse.status) || httpResponse.body.code === 3) {
      subject.error(new ServiceError(httpResponse.status, '你还没有登录呢'))
    }
    else {
      subject.next(httpResponse);
      subject.complete()
    }
  }
}
