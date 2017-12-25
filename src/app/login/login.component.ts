import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtTokenService} from "../services/jwt-token.service";
import {RequestOptions, Headers} from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private jwtToken: JwtTokenService) { }

  ngOnInit() {
  }

  login() {
    //exemplo de uso
    this.http.post('http://localhost:8000/api/login', this.user).subscribe(data =>
        this.jwtToken.token = data['token']
    );

    //this.auth.login(this.user).then(response => {
      //this.router.navigate(this.redirectAfterLogin)
    //});
  }
}
