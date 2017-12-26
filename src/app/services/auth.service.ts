import {Injectable} from '@angular/core';
import {JwtTokenService} from "./jwt-token.service";
import 'rxjs/add/operator/toPromise';
import {LocalStorageService} from "./local-storage.service";
import {HttpClient} from "@angular/common/http";

const USER_KEY = 'user';
@Injectable()
export class AuthService {

  public check: Boolean = false;

  public user = {
    name: ''
  };

  constructor(private jwtToken: JwtTokenService,
              private http: HttpClient,
              private localStorage: LocalStorageService) {
    this.check = this.jwtToken.token ? true : false;
    let userLocalStorage = this.localStorage.getObject(USER_KEY);
    this.user = userLocalStorage ? userLocalStorage : {
          name: ''
        };
  }

  /*login({email, password}) {
    return this.http
        .post('http://localhost:8000/api/login', {email, password})
        .toPromise()
        .then(response => {
          this.check = true;
          this.jwtToken.token = response.json().token;
          this.getUser();
          return response;
        });
  }*/

  /*logout() {
    this.jwtToken.token = null;
    this.check = false;
    this.localStorage.remove(USER_KEY);
  }*/

  /*private getUser() {
    this.http
        .get('http://localhost:8000/api/user', this.requestOptions.merge(new RequestOptions()))
        .toPromise()
        .then(response => {
          this.user = response.json().user;
          this.localStorage.setObject(USER_KEY, this.user);
        });
  }*/
}