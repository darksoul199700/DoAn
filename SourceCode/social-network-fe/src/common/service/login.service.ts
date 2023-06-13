import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import {signInApi, signUpApi} from "./backend-api"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(
    private http: HttpClient,
  ){}

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  userLogin(username: string, password: string){
    let body = {
      username: username,
      password: password
    }
    return this.http.post<any>(signInApi, body, this.httpOption)
  }

  userRegister(username: string, password: string, email: string){
    let body = {
      username: username,
      email: email,
      password: password,

    }
    return this.http.post<any>(signUpApi, body)
  }
}
