import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import routing from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./services/local-storage.service";
import {JwtTokenService} from "./services/jwt-token.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,//necessário adicionar para trabalhar com formulario ex: uso de ngModel
        routing, //importando minhas rotas do arquivo app.routing.ts,
        HttpClientModule // lib para fazer requisições get, post, etc..
    ],
    providers: [
        LocalStorageService,
        JwtTokenService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
