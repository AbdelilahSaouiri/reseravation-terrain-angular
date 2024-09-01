import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../../model/User';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public formGroup!: FormGroup
  public user!: LoginUser
  token!: any;
  UserAlreadLogged: string = localStorage.getItem("access-token") || "";
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      email: this.fb.control('',[Validators.email,Validators.required]),
      password: this.fb.control('',[Validators.required,Validators.minLength(4),Validators.maxLength(50)])
      })
  }


  OnSubmit() {
    if (this.UserAlreadLogged) {
      Swal.fire({
        icon: 'warning',
        titleText: "deja connecté !",
        timer: 1500,
        position: 'center',
        showConfirmButton:false
      })
      return;
    }
    this.user = this.formGroup.value;
    this.authService.login(this.user).subscribe({
      next: data => {
        this.token = data;
        this.loadProfile()
       const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
              });
              Toast.fire({
                icon: "success",
                title: "Vous etes connecte avec success"
              });
        this.router.navigateByUrl('');
      }, error: err => {
        Swal.fire({
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
          titleText:'something wrong ! 😔 please try later '
        })
      }
    })
  }
  
  loadProfile() {
    this.authService.loadProfie(this.token);
   }
}
