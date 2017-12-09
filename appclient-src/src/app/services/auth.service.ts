import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://ubre-shared.herokuapp.com/token', user, {headers: headers}).map(res => res.json());
  }

}
