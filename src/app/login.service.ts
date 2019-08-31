import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username, pwd) {
    var user = {name: username , password: pwd};
    return this.http.post<any>('http://localhost:3000/api/login', user);
  }
}
