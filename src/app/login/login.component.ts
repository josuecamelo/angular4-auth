import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  login() {
    //this.auth.login(this.user).then(response => {
      //this.router.navigate(this.redirectAfterLogin)
    //});
  }
}
