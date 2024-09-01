import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import matchModel from '../../../model/matchModel';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'] // Corrected from styleUrl to styleUrls
})
export class MatchesComponent implements OnInit {
  public today: number = new Date().getDay();
  public tomorrow: number = (this.today + 1) % 7;
  public hours: any;
  public reserved: boolean[][] = [];
  public isReserved:boolean[]=[]
  public matchs: matchModel[] = [];
  public id!: number;
  public contre: string[][] = [];
  public username!: string;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    this.username =localStorage.getItem("username") ||  "player 2";
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'] ? +params['id'] : this.today;
      this.matchesAlreadyReserved(this.id);
    });

    this.hours = [
      { 'debut': '17:00', 'fin': '18:00' },
      { 'debut': '18:00', 'fin': '19:00' },
      { 'debut': '19:00', 'fin': '20:00' },
      { 'debut': '20:00', 'fin': '21:00' },
      { 'debut': '21:00', 'fin': '22:00' },
      { 'debut': '22:00', 'fin': '23:00' },
      { 'debut': '23:00', 'fin': '00:00' },
    ];

    this.reserved = this.hours.map(() => Array(7).fill(false));
    this.contre = this.hours.map(() => Array(7).fill(''));
    this.isReserved = this.hours.map(() => Array(7).fill(false));
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
          this.contre[match.matchTime][match.dayNumber] = match['adversaire']; 
        });
      },
      error: err => {
        Swal.fire({
        icon: 'error',
        title: `something wrong 😔 `,
        titleText:'please try later !',
        showConfirmButton: false,
        timer: 1500
      });
      }
    });
  }

  reserverMatch(i: number) {
    if (!localStorage.getItem("access-token")) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.isReserved[this.id]= this.matchs.some((el: matchModel) => (el.matchPlayer === this.authService.subject))
    if (this.isReserved[this.id]) {
         Swal.fire({
        icon: 'error',
        title: `vous avez le droit de reserver qu'une seule match Par Jour`,
        showConfirmButton: false,
        timer: 1500
         });
      return;
     }
       Swal.fire({
      title: 'Contre',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Reserve',
      showLoaderOnConfirm: true,
      preConfirm: (adversaire) => {
        if (!adversaire) {
          Swal.showValidationMessage('true');
        }
        return this.matchService.reserverMatch(i, this.id, adversaire).toPromise();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const adversaire = result.value.adversaire;
        this.reserved[i][this.id] = true;
        this.contre[i][this.id] = adversaire;
        Swal.fire({
          icon: 'success',
          title: 'Match reserved!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `${error.error['message']}`,
        showConfirmButton: false,
        timer: 1500
      });
    });
     }
  
}
