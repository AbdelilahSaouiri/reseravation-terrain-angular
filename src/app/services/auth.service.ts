import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginUser, RegisterUser } from '../../model/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  register(user: RegisterUser):Observable<string> {
    
    return this.http.post(`${environment.backAuth}/register`,user,{responseType:'text'});
    
  }

   login(user: LoginUser):Observable<LoginUser> {
    
    return this.http.post<LoginUser>(`${environment.backAuth}/login`, user);
    
  }



  
}
