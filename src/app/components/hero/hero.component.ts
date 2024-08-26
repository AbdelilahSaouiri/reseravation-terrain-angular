import { Component, OnInit } from '@angular/core';
import { Jour } from '../../../utils/JourSemaine';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  
  public date?:number;
  public tomorrowDate?: number;
  public today!: string;
  public tomorrow!: string;
  public btnColored: number = 1;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.date = new Date().getDay()
    this.tomorrowDate = this.date + 1;
    this.handleDate(this.date)
  }

  public handleDate(date:number) {
    const jour = [
      Jour.Dimanche,
      Jour.Lundi,
      Jour.Mardi,
      Jour.Mercredi,
      Jour.Jeudi,
      Jour.Vendredi,
      Jour.Samedi
    ]
    this.today = jour[date]
    this.tomorrow = (date+1)===7 ? jour[0]:jour[date + 1]
  }

  handleToday() {
    this.btnColored = 1;
     this.router.navigateByUrl(`/matches/${this.date}`);
  }

  handleTomorrow() {
    this.btnColored=2
   this.router.navigateByUrl(`/matches/${this.tomorrowDate}`);
  }
}
