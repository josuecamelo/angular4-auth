import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {JwtTokenService} from "../services/jwt-token.service";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  percent: number = 0;
  redirectAfterLogout = ['/login'];

  constructor(private auth: AuthService,
              //private jwtToken: JwtTokenService,
              private router: Router) {
  }

  logout() {
    this.auth.logout();
    setInterval(() => {
      this.percent += 10;
      if (this.percent === 100) {
        this.auth.check = false;
        this.router.navigate(this.redirectAfterLogout);
      }
    }, 300);
  }

  ngOnInit() {
    this.logout();
  }
}
