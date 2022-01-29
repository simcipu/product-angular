import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Errors } from "../classes/Errors";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    title = 'appBootstrap';

    closeResult!: string;
    constructor(private route: Router) {}
    errors!: Errors;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                console.log(err.headers)
                // auto logout if 401 or 403 response returned from api
                this.route.navigate(['forbidden']);
            }

            let httpResponse :HttpErrorResponse;
            httpResponse =err;
            this.errors = httpResponse.error;
            const error = err.error?.message || err.statusText;
           
            console.error(this.errors.errors[0]);

            if (this.errors.errors[0]){

               
            }
            return throwError(error);
        }))
      
    }

}