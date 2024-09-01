import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  token: any = '';
  constructor(private router: Router,private authSerivce:AuthService) { }
  
  ngOnInit(): void {
    this.token = this.authSerivce.loadFromLocalStorage();
   
  }
 
}