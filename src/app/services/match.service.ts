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
  
  reserverMatch(MatchTime: number, DayNumber: number): Observable<matchModel> {
    const matchInfos = {
      "MatchTime": MatchTime.toString(),
      "DayNumber":DayNumber.toString()
    }
    return this.http.post<matchModel>(`${environment.backurl}`,matchInfos);
  }

  getAllMatches(jour: number): Observable<matchModel[]>{
    const params=new HttpParams().set("jour",jour.toString())
    return this.http.get<matchModel[]>(`${environment.backurl}`,{params});
  }
}
