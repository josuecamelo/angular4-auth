import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor() { }

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
        console.log("interceptando requisição ... ");
        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue")});
        console.log("Enviando requisição com Novos Headers ...");
        //send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                //intercept the respons error and displace it to the console
                console.log("Ops Ocorreu um Erro");
                console.log(error);
                console.log(error.statusText);
                console.log(error.status); // --> 404
                console.log(caught);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}