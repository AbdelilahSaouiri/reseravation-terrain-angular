import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification-reg',
  templateUrl: './verification-reg.component.html',
  styleUrl: './verification-reg.component.css'
})
export class VerificationRegComponent implements OnInit{

  public message!: any;
  constructor(private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
       this.message = params.get('message')
      })
  }

  home() {
    this.router.navigateByUrl("")
  }
}
