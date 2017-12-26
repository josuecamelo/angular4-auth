import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "../../services/jwt-token.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Object = [];
  constructor(private http: HttpClient, private jwtToken: JwtTokenService) {

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

    this.http
        .get('http://localhost:8000/api/products')
        .subscribe(
            data => this.products = data
        );
  }
}
