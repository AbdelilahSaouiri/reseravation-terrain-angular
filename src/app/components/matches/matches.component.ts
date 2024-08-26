import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import matchModel from '../../../model/matchModel';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent  implements OnInit {

  public today:number = new Date().getDay();
   public tomorrow: number = (this.today + 1) % 7;
  public hours: any;
  public reserved: boolean[][] = [];
  public matchs: matchModel[] = [];
  public id!: any;
  
  constructor(private matchService: MatchService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
     this.route.params.subscribe((params) => {
       this.id = params['id'] ? +params['id'] : this.today; 
       this.matchesAlreadyReserved(this.id);
    });
    this.hours = [
        {'debut':"17:00",'fin':"18:00"},
        {'debut':"18:00",'fin':"19:00"},
        {'debut':"19:00",'fin':"20:00"},
        {'debut':"20:00",'fin':"21:00"},
        {'debut':"21:00",'fin':"22:00"},
        {'debut':"22:00",'fin':"23:00"},
        {'debut':"23:00",'fin':"00:00"},
    ]

    this.reserved = this.hours.map(() => Array(7).fill(false));
    
  }

  trackByFn(index: number, item: any): number {
   return index; 
}

matchesAlreadyReserved(day: number) {
  this.matchService.getAllMatches(day).subscribe({
    next: data => {
      this.matchs = data;
      this.matchs.forEach((match: matchModel) => {
        this.reserved[match.matchTime][match.dayNumber] = true;
      });
    },
    error: err => {
      console.log(err.error);
    }
  });
}

reserverMatch(i: number) {
  this.matchService.reserverMatch(i, this.id).subscribe({
    next: data => {
      this.reserved[i][this.id] = true; 
    }, 
    error: err => {
      alert(err.error.message);
    }
  });
}

  


  

}
