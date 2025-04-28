import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { isAuthResponse } from '../../interfaces/authResponse';
import { isBooleanResponse } from '../../interfaces/booleanResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStateSubject = new BehaviorSubject<boolean> (false);
  loginState$ = this.loginStateSubject.asObservable();

  constructor(private http: HttpClient, private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user) => {
      this.sendCredentialToBackend(user.idToken).subscribe(response => {
        if (isAuthResponse(response))
          if (response.data.result === 'Log In success.')
            this.loginStateSubject.next(true);
      });
    });
    this.isLoggedIn().subscribe();
  }

  // 이후 백엔드에 credential 보내는 메서드
  sendCredentialToBackend(credential: string) {
    return this.http.post('http://localhost:8080/auth/login/google',
      { credential: credential },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }), withCredentials: true
      }
    );
  }

  logOut() {
    return this.http.get('http://localhost:8080/auth/logout', {
      withCredentials: true
    }).subscribe(
      response => {
        if (isAuthResponse(response))
          if (response.data.result === 'Log Out success.')
            this.loginStateSubject.next(false);
      }
    );
  }

  isLoggedIn () {
    return this.http.get('http://localhost:8080/auth/loggedIn', {
      withCredentials: true
    }).pipe(tap(res => {
      if (isBooleanResponse(res))
        this.loginStateSubject.next(res.data.result);
    }));
  }
}
