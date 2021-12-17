import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers: any = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    };

    if (request.url.includes('login')) {
      const loginRequest = request.clone({
        setHeaders: headers,
      });
      return next.handle(loginRequest);
    }

    const withoutAuth = request.headers.get('Without-Auth');
    if (withoutAuth) {
      return this.continueWithoutAuth(request, next, headers);
    }
    headers[
      'Authorization'
    ] = `Bearer Wookie2019`;
    const newRequest = request.clone({ setHeaders: headers });
    return next.handle(newRequest).pipe();
  }

  private continueWithoutAuth(
    request: HttpRequest<any>,
    next: HttpHandler,
    globalHeaders: any
  ): Observable<any> {
    const headers = request.headers.delete('Without-Auth');
    request = request.clone({
      setHeaders: globalHeaders,
    });
    return next.handle(request);
  }

}
