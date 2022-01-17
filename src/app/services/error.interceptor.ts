import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private route: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                this.route.navigate(['forbidden']);
            }
            if ([500].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                this.route.navigate(['forbidden']);
            }
            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}