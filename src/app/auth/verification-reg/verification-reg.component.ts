import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verification-reg',
  templateUrl: './verification-reg.component.html',
  styleUrl: './verification-reg.component.css'
})
export class VerificationRegComponent implements OnInit{

  message: string="Verify email by the link sent to email address";
  token: string | null = null;

  constructor(private router: Router,
    private route:ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    if (this.token) {
      this.message=""
      this.authService.ConfirmerCompte(this.token).subscribe({
        next: data => {
          console.log(data);
        }, error: err => {
          alert("Erreur, essayer plus tard !");
        }
      });
    } else {
        this.message="Verify email by the link sent to email address"
    }
  }

  home() {
    this.router.navigateByUrl("");
  }
}