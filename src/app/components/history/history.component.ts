import { Component } from '@angular/core';
import { SolvingResult } from '../../interfaces/solvingResult';
import { BehaviorSubject } from 'rxjs';
import { QuizService } from '../../services/quiz/quiz.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  private loginState = new BehaviorSubject<boolean>(false);
  loginState$ = this.loginState.asObservable();

  private history = new BehaviorSubject<Array<SolvingResult> | null> (null);
  protected history$ = this.history.asObservable();

  constructor (private quizService: QuizService, private authService: AuthService, private router: Router) {
    this.authService.loginState$.subscribe(status => {
      this.loginState.next(status);
      if (this.loginState.value === false)
        this.router.navigateByUrl('/');
    });
  }
}
