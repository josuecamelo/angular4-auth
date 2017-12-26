import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "../../services/jwt-token.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Object = [];
  constructor(private http: HttpClient,
              private jwtToken: JwtTokenService) {

  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    /*let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken.token}`,
      'Content-Type': 'application/json'
    });

    this.http
        .get('http://localhost:8000/api/products', {headers: headers})
        .subscribe(
            data => this.products = data
        );*/




    //segundo exemplo
    /*let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken.token}`,
      'Content-Type': 'application/json'
    });

    this.http
        .get('http://localhost:8000/api/products', {headers: headers})
        .subscribe(
            data => this.products = data
            err => {
              if (err.status === 401) {
                console.log(err.status);
                this.http.post('http://localhost:8000/api/refresh_token', {}, {headers: headers})
                    .subscribe(data => {
                        this.jwtToken.token = data['token'];

                        //fazendo requisição de produto novamente
                        console.log('requisitando listagem de produtos novamente');
                        let headers = new HttpHeaders({
                          'Authorization': `Bearer ${this.jwtToken.token}`,
                          'Content-Type': 'application/json'
                        });
                        this.http
                          .get('http://localhost:8000/api/products', {headers: headers})
                          .subscribe(data => this.products = data);
                    });
              }
            }
        );*/

    //trabalhando com o interceptador para colocar token nas requisições
    /*this.http
        .get('http://localhost:8000/api/products')
        .subscribe(
            data => this.products = data
        );*/

    this.http
        .get('http://localhost:8000/api/products')
        .subscribe(
            data => this.products = data,
            err => {
              if (err.status === 401) {
                //this.auth.atualizarToken();
                //this.auth.getHeaderDefault();
                //location.reload();
                  console.log('Houve Erro: 401');
              }
            }
        );
  }
}
