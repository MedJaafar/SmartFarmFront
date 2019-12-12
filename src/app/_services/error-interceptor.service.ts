import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            else if(err.status === 403){
              err.message = ' Failed to login! Wrong credentials';
            }
            else  if(err.status === 500){
                if(err.message === "Http failure response for http://localhost:8080/register: 500 OK"){
                    err.message = " The username already exists ! Username must be unique."
                }
                else{
                err.message = ' Failed to establish connection, the System is down. Or App is not running ! Or other problem';}
              }
            else {
               err.message =' Error ! Unable to get response from the server. Please, check internet connection.';
            }
            const error = err.message || err.statusText;
            return throwError(error);
        }))
    }
}