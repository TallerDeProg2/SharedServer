import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:5000/token', user, {headers: headers})
      .map(res => {
        let res_json = res.json();
        res_json.success = res.status < 210;
        return res_json;
      });
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    return localStorage.getItem('id_token') != null;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  registerRule(rule){
    let headers = new Headers();
    this.loadToken();
    headers.append('token', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:5000/rules', rule, {headers: headers})
      .map(res => {
        let res_json = res.json();
        res_json.success = res.status < 210;
        return res_json;
      });
  }

  getRules(){
    let headers = new Headers();
    this.loadToken();
    headers.append('token', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:5000/rules', {headers: headers})
      .map(res => {
        let res_json = res.json();
        res_json.success = res.status < 210;
        return res_json;
      });
  }

  getRuleCommits(ruleId){
    let headers = new Headers();
    this.loadToken();
    headers.append('token', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:5000/rules/'+ruleId, {headers: headers})
      .map(res => {
        let res_json = res.json();
        res_json.success = res.status < 210;
        return res_json;
      });
  }

}
