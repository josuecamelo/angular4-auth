import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    //exemplo de uso
    this.http.post('http://localhost:8000/api/login', this.user).subscribe(data => {console.log(data)});

    //this.auth.login(this.user).then(response => {
      //this.router.navigate(this.redirectAfterLogin)
    //});
  }
}
