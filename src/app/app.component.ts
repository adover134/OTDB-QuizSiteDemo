import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { BehaviorSubject, tap } from 'rxjs';
import { GoogleSignInComponent } from "./components/google-sign-in/google-sign-in.component";
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    GoogleSignInComponent,
    SocialLoginModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuizSite';
  private loginState = new BehaviorSubject<boolean>(false);
  loginState$ = this.loginState.asObservable();

  constructor (private route: Router, private authService: AuthService) {
    this.authService.loginState$.subscribe(status => {
      this.loginState.next(status);
      this.initOneTap();
    });
  }

  async initOneTap() {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (window.google && window.google.accounts && window.google.accounts.id) {
      let state = this.loginState.value;
      if (state === false)
      {
        console.log(state);
        window.google.accounts.id.prompt();
      }
    } else {
      console.warn('아직 구글 ID 서비스가 로드되지 않았습니다.');
    }
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
  
  toMain (): void {
    this.route.navigateByUrl('/');
  }

  toHistory (): void {
    this.route.navigateByUrl('/history');
  }

  logOut() {
    this.authService.logOut();
  }
  
}
