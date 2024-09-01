import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { confirmation, LoginUser, RegisterUser } from '../../model/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import {jwtDecode, JwtDecodeOptions, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  token!: any;
  username!: any;
  role!: any
  subject!: any;
  

  constructor(private http: HttpClient, private router: Router) { 
    this.loadFromLocalStorage();  
  }
  
  register(user: RegisterUser): Observable<confirmation> {
    return this.http.post<confirmation>(`${environment.backAuth}/register`, user);
  }

  login(user: LoginUser): Observable<any> {
    return this.http.post<any>(`${environment.backAuth}/login`, user);
  }

  ConfirmerCompte(tokenConfirmation: string): Observable<any> {
    const params = new HttpParams().set("token", tokenConfirmation.toString())
    return this.http.get<any>(`${environment.backAuth}/confirm-token`, {params})
  }
  
  loadProfie(data: any) {
    this.isAuthenticated = true;
    this.token = data["access-token"];
    let decodedJWT = JSON.parse(window.atob(this.token.split('.')[1]));
    const jwtDecoded:JwtPayload = jwtDecode<JwtPayload>(this.token);
    this.subject = jwtDecoded.sub;
    localStorage.setItem("access-token", this.token);
    localStorage.setItem("username", decodedJWT.username);
  }
  
  logout() {
    this.isAuthenticated = false;
    this.token = undefined;
    this.username = undefined;
    this.role = undefined;
    localStorage.removeItem("access-token");
    localStorage.removeItem("username");
    this.router.navigateByUrl("");
  }

  loadFromLocalStorage() {
    this.token = localStorage.getItem("access-token");
    this.username = localStorage.getItem("username");
    if (this.token) {
      this.isAuthenticated = true;
      let jwtDecoded = jwtDecode(this.token);
      this.subject = jwtDecoded.sub;
      //this.role = jwtDecoded['scope'];
    }
  }
}
