import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public formGroup!: FormGroup
  public user!:LoginUser
  constructor(private fb:FormBuilder,private authService:AuthService){}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: this.fb.control('',[Validators.email,Validators.required]),
      pwd: this.fb.control('',[Validators.required,Validators.minLength(4),Validators.maxLength(50)])
      })
  }


  OnSubmit() {
    this.user = this.formGroup.value;
    this.authService.login(this.user).subscribe({
      next: data => {
        console.log(data);
      }, error: err => {
        console.log(err.error)
      }
    })
    }
}
