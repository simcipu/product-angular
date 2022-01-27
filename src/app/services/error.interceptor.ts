import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Errors } from "../classes/Errors";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    title = 'appBootstrap';

    closeResult!: string;
    constructor(private route: Router, private modalService: NgbModal) {}
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

                open(this.errors.errors[0]);
            }
            return throwError(error);
        }))
      
    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}