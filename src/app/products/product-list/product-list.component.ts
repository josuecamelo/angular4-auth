import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtTokenService} from "../../services/jwt-token.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "http";
import {RequestOptions} from "http";

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
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken.token}`,
      'Content-Type': 'application/json'
    });

    this.http
        .get('http://localhost:8000/api/products', {headers: headers})
        .subscribe(
            data => this.products = data
        );

    /*this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(
        success => {
          console.log("Successfully Completed");
          console.log(success);
        }
    );*/
  }
}
