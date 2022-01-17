import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private BasicAuth: AuthService, private route: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {


    let AuthToken = this.BasicAuth.getAuthToken();
    let User = this.BasicAuth.loggedUser();

    if (AuthToken && User) {
      request = request.clone(
        {
          setHeaders : {Authorization:'Bearer '+ AuthToken }
        });
    } 
    return next.handle(request);
  }
}


