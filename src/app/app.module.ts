import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatchesComponent } from './components/matches/matches.component';
import { VerificationRegComponent } from './auth/verification-reg/verification-reg.component';
import { appHttpInterceptor } from './interceptors/app-http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeroComponent,
    FooterComponent,
    MatchesComponent,
    LoginComponent,
    RegisterComponent,
    VerificationRegComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([appHttpInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
