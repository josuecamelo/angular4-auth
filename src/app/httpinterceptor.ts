import {Injectable, Injector} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {AuthService} from "./services/auth.service";
import {JwtTokenService} from "./services/jwt-token.service";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./services/local-storage.service";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    authReq = null;
    auth: AuthService;
    http:HttpClient;

    constructor(private injector: Injector,
                private jwtToken: JwtTokenService, private localStorage: LocalStorageService) {

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

        //let strData = this.localStorage.get('ttl_date');
        ///let strHora = this.localStorage.get('ttl_hour');
        //let partesHora = strHora.split(':');
        //let partesData = strData.split("-");
        //let data = new Date(partesData[0], partesData[1] - 1, partesData[2], partesHora[0], partesHora[1], partesHora[2]);


        //if(strData == null || strData == ''){
            //if (new Date() >= data){
                //this.localStorage.set('ttl_date', '');
                //console.log('atualizar token');
                //this.auth.atualizarToken();
                //teste com expiração de token
                /* let time = new Date();
                 let outraData = new Date();
                 outraData.setMinutes(time.getMinutes() + 1);*/
                //console.log(time);
                //console.log(outraData);

                //this.localStorage.set('ttl_date', outraData.getFullYear() + '-' + (outraData.getMonth() + 1) + '-' + outraData.getDate());
                //this.localStorage.set('ttl_hour', outraData.getHours() + ':' + (outraData.getMinutes())+ ':' + (outraData.getSeconds() < 10 ? '0' + outraData.getSeconds() : outraData.getSeconds()));
                //teste com expiração de token
            //}
        //}

        return next.handle(this.authReq)
            .catch((error, caught) => {
                //console.log('oi');
                //if (error.status === 401 || error.status === 403) {
                    /*this.auth.atualizarToken();
                    this.authReq = req.clone({
                        headers: req.headers
                            .set("Authorization", `Bearer ${this.jwtToken.token}`)
                            .set('Content-Type', 'application/json')
                    });

                    return next.handle(this.authReq);*/

                    this.auth.logout();

                    //return next.handle(this.authReq);
                //} else {
                    return Observable.throw(error);
               // }
            }) as any;
    }
}