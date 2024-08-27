import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { confirmation, LoginUser, RegisterUser } from '../../model/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  register(user: RegisterUser):Observable<confirmation> {
    return this.http.post<any>(`${environment.backAuth}/register`,user);
    
  }

   login(user: LoginUser):Observable<LoginUser> {
    return this.http.post<LoginUser>(`${environment.backAuth}/login`, user);
  }

  ConfirmerCompte(tokenConfirmation: string): Observable<any> {
    const params= new HttpParams().set("token",tokenConfirmation.toString())
     return this.http.get<any>(`${environment.backAuth}/confirm-token`,{params})
   }
  


  
}
