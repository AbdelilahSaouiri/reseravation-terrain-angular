import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  public clicked: boolean = false;
  
  handleColorButton() {
    this.clicked = !this.clicked;
  }
}
