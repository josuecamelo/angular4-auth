import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtTokenService} from "../services/jwt-token.service";
//import {RequestOptions, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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

  redirectAfterLogin = ['/products/list'];

  constructor(private http: HttpClient,
              private jwtToken: JwtTokenService,
              private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    //exemplo de uso
    this.http.post('http://localhost:8000/api/login', this.user).subscribe(data => {
      this.auth.check = true;
      this.jwtToken.token = data['token'];
      this.router.navigate(this.redirectAfterLogin)
    });

    //this.auth.login(this.user).then(response => {
      //this.router.navigate(this.redirectAfterLogin)
    //});
  }
}
