import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule//necessário adicionar para trabalhar com formulario ex: uso de ngModel
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
