import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../matchPasswordsValidator';
import { AuthService } from '../../services/auth.service';
import { confirmation, RegisterUser } from '../../../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formRegister!: FormGroup;
  public user!: RegisterUser
  public isLoading: boolean=false;
  public userName!: string;
  public tokenConfirmation!: string;
  public conf!: confirmation;
  public message!: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]),
      year: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
      },
      { validators: matchPasswordsValidator() }
    );
  }

  OnSubmit() {
    this.isLoading=true
    this.user = this.formRegister.value;
    this.authService.register(this.user).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.router.navigateByUrl(`verifyEmail`)
    }, error: err => {
        this.isLoading=false
         alert("error, essayer plus tard !")
      }
    })
  
  }
}
