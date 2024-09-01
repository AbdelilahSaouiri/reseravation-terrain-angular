import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import matchModel from '../../model/matchModel';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }
  
  reserverMatch(MatchTime: number, DayNumber: number,adversaire:string): Observable<matchModel> {
    const matchInfos = {
      "MatchTime": MatchTime.toString(),
      "DayNumber": DayNumber.toString(),
      "adversaire":adversaire.toString()
    }
    return this.http.post<matchModel>(`${environment.backurl}`,matchInfos);
  }

  getAllMatches(jour: number): Observable<matchModel[]>{
    const params=new HttpParams().set("jour",jour.toString())
    return this.http.get<matchModel[]>(`${environment.backurl}`,{params});
  }

  // VerifyWhosReserved(i: number, day: number): Observable<any> {
  //   let params = new HttpParams()
  //     .set("time", i.toString())
  //     .set("day",day.toString())
  //   return this.http.get<any>(`${environment.backurl}`, { params });
  // }
}
