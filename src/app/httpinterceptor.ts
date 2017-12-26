import {Injectable, Injector} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {AuthService} from "./services/auth.service";
import {JwtTokenService} from "./services/jwt-token.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    authReq = null;
    auth: AuthService;
    http:HttpClient;

    constructor(private injector: Injector,
                private jwtToken: JwtTokenService) {

    }

    //metodo de teste não modificar
    /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercepted request ... ");
        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue")});
        console.log("Sending request with new header now ...");
        //send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log("Error Occurred");
                console.log(error);
                console.log(error.status); // --> 404
                console.log(caught);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }*/

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //injetando o Auth Service para Verificar se a Pessoa está logada
        this.auth = this.injector.get(AuthService); // get it here within intercept

        if(this.auth.check){
            this.authReq = req.clone({
                headers: req.headers
                    .set("Authorization", `Bearer ${this.jwtToken.token}`)
                    .set('Content-Type', 'application/json')
            });
        }else{
            this.authReq = req.clone();
        }

        return next.handle(this.authReq)
            .catch((error, caught) => {
                console.log('oi');
                //if (error.status === 401 || error.status === 403) {
                    /*this.auth.atualizarToken();
                    this.authReq = req.clone({
                        headers: req.headers
                            .set("Authorization", `Bearer ${this.jwtToken.token}`)
                            .set('Content-Type', 'application/json')
                    });

                    return next.handle(this.authReq);*/

                    //this.auth.logout();

                    //return next.handle(this.authReq);
                //} else {
                    return Observable.throw(error);
               // }
            }) as any;
    }
}