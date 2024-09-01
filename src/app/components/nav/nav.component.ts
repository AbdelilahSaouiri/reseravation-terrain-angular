import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  public clicked: boolean = false;
  username!: any 
  token!:string
  
  constructor(public authService:AuthService){}

  ngOnInit(): void {
    this.token = localStorage.getItem("access-token") || "";
    if (!this.token) {
      this.username = undefined
      localStorage.removeItem("username")
    }
    else {   
      this.username = localStorage.getItem("username");
    }
  }
  handleColorButton() {
    this.clicked = !this.clicked;
  }
}
