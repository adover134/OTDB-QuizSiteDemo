import { Component } from '@angular/core';
import { SolvingResult } from '../../interfaces/solvingResult';
import { BehaviorSubject, map, tap } from 'rxjs';
import { QuizService } from '../../services/quiz/quiz.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ResultsResponse } from '../../interfaces/resultsResponse';
import { CommonModule } from '@angular/common';
import { QuizCategories } from '../../enums/quizCategories';
import { isNumberResponse } from '../../interfaces/numberResponse';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  private loginState = new BehaviorSubject<boolean>(false);
  loginState$ = this.loginState.asObservable();

  private history = new BehaviorSubject<Array<SolvingResult> | null> (null);
  protected history$ = this.history.asObservable();
  
  protected categories = QuizCategories;

  protected page = 1;
  protected maxPage = 1;

  constructor (private quizService: QuizService, private authService: AuthService, private router: Router) {
    this.authService.loginState$.subscribe(status => {
      this.loginState.next(status);
      if (this.loginState.value === false)
        this.router.navigateByUrl('/');
      else
      {
        this.quizService.getHistoryCount$()
        .pipe(
          tap(res=>console.log(res)),
          map(res=>this.maxPage=isNumberResponse(res)?res.data.result:0)
        )
        .subscribe();
        if (this.maxPage > 0)
          this.getHistory(1);
      }
    });
  }

  async getHistory(page: number) {
    this.quizService.getResults$(page)
    .pipe(
      tap(res=>console.log(res)),
      map((res:ResultsResponse)=>{this.history.next(res.data.result); this.page = page;}),
      tap(()=>console.log(this.history.value))
    )
    .subscribe();
  }
}
