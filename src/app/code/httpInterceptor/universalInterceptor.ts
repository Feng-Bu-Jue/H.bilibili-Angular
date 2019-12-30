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
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpEventSubject: Subject<HttpEvent<any>> = new Subject<HttpEvent<any>>();
    next.handle(this.assembleNewRequest(req)).subscribe(
      res => {
        switch (res.type) {
          case 4:
            this.handleResponseEvent(<HttpResponse<BiliBiliProtocal<any>>>res, httpEventSubject)
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
        this.handleResponseEvent(httpResponse, httpEventSubject)
        httpEventSubject.error(error)
      });

    return httpEventSubject;
  }


  protected assembleNewRequest(req: HttpRequest<any>): HttpRequest<any> {
    //querystring
    let csrf_token = this.store.selectSnapshot(UserState.getToken);
    let params = { csrf_token };
    for (let key in params) if (!params[key]) delete params[key];//remove empty param

    //body
    let body = req.body;
    if (req.method === 'POST') {
      body = body + Object.entries(params).map(([key, value]) => `&${key}=${value}`)
      params = null//clear query string params
    }

    //options
    let withCredentials = true;
    if (req.url.includes('i0.hdslb.com'))//todo
    {
      withCredentials = false;
    }

    let newReq = req.clone({
      withCredentials,
      setParams: params,
      body
    });
    return newReq;
  }

  protected async handleResponseEvent(httpResponse: HttpResponse<BiliBiliProtocal<any>>, subject: Subject<HttpEvent<any>>) {
    if ([401, 403].includes(httpResponse.status) || httpResponse.body.code === 3) {
      subject.error(new ServiceError(httpResponse.status, '你还没有登录呢'))
    }
    else if (httpResponse.body.code && httpResponse.body.code !== 0) {
      switch (httpResponse.body.code) {
        case 1:
          subject.error(new ServiceError(httpResponse.status, 'bad request?'))
          break;
        default:
          subject.error(httpResponse)
          break;
      }
    }
    else {
      subject.next(httpResponse);
      subject.complete()
    }
  }

}
