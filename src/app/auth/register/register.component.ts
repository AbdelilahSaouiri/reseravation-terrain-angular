import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../matchPasswordsValidator';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formRegister!: FormGroup;
  public user!: RegisterUser
  public messageVerification!: string
  public isLoading: boolean=false;
  
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
      next: (data:string) => {
        this.isLoading = false;
        this.messageVerification = data
        this.router.navigate(['/verifyEmail',{message:this.messageVerification}]);
      }, error: err => {
        this.isLoading=false
       alert(err.error)
      }
    })
  
  }
}
