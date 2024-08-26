import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MatchesComponent } from './components/matches/matches.component';
import { VerificationRegComponent } from './auth/verification-reg/verification-reg.component';


const routes: Routes = [
  {path:"matches/:id",component:MatchesComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"verifyEmail",component:VerificationRegComponent},
  {path:"", redirectTo:`/matches/${new Date().getDay()}`,pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
