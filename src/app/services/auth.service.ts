import {Injectable} from '@angular/core';
import {JwtTokenService} from "./jwt-token.service";
import 'rxjs/add/operator/toPromise';
import {LocalStorageService} from "./local-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

const USER_KEY = 'user';
@Injectable()
export class AuthService {

  public check: Boolean = false;

  public user:any;

  redirectAfterLogin = ['/products/list'];

  constructor(private jwtToken: JwtTokenService,
              private http: HttpClient,
              private localStorage: LocalStorageService, private router: Router) {
    this.check = this.jwtToken.token ? true : false;
    let userLocalStorage = this.localStorage.getObject(USER_KEY);
    this.user = userLocalStorage ? userLocalStorage : {
          name: ''
        };
  }

  login({email, password}) {
      this.http
        .post('http://localhost:8000/api/login', {email, password})
        .subscribe(data => {
          this.check = true;
          this.jwtToken.token = data['token'];
          this.getUser();
          this.router.navigate(this.redirectAfterLogin)
        });
  }

  private getUser() {
    this.http
        .get('http://localhost:8000/api/user')
        .subscribe(data => {
          this.user = data
          this.localStorage.setObject(USER_KEY, this.user);
        });
  }

  atualizarToken(){
    this.http.post('http://localhost:8000/api/refresh_token', {}, {headers: this.getHeaderDefault()})
        .subscribe(data => {
          this.jwtToken.token = data['token'];
        });
  }

  getHeaderDefault(){
    return new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken.token}`,
      'Content-Type': 'application/json'
    });
  }
}