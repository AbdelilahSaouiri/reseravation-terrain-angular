import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../matchPasswordsValidator';
import { AuthService } from '../../services/auth.service';
import { confirmation, RegisterUser } from '../../../model/User';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

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
  this.isLoading = true;
  this.user = this.formRegister.value;
  this.authService.register(this.user).subscribe({
    next: (data: HttpResponse<any>) => {
      this.isLoading = false;
      if (data.status === 200) {
          this.router.navigateByUrl('/verifyEmail');  
      } else if (data.status===400) {
        Swal.fire({
          icon: 'warning',
          timer: 1500,
          titleText: `${data.body.message}`,
          showConfirmButton:false
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
          titleText: `Unexpected response received. Please try again later!`,
        });
      }
    },
    error: err => {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
        titleText: `Something went wrong 😔 Please try later!`,
      });
    }
  });
}

}
