import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { QuizCategories } from '../../enums/quizCategories';
import { QuizDifficulties } from '../../enums/quizDifficulties';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { QuizSet } from '../../interfaces/quizSet';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { SnackbarStackService } from '../../services/custom-snackbar/custom-snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-main',
  imports: [
    FormsModule,
    CommonModule,
    CustomSnackbarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  @ViewChild('quizForm') quizForm!: NgForm;
  protected amount = 10;
  protected categoryValues = Array.from({ length: 33 - 9 + 1 }, (_, i) => i + 9);
  protected categories = QuizCategories;
  protected category = 33;
  protected difficultyValues = Object.values(QuizDifficulties);
  protected difficulty = 'easy';
  protected answerType = 'boolean';

  private loggedIn = new BehaviorSubject<boolean> (false);
  protected loggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router, private quizService: QuizService, private snackbar: SnackbarStackService) {
    this.quizService.getResult$().subscribe();
  }

  submitForm() {
    if (this.quizForm.valid) {
      // form이 유효할 때만 제출
      this.getQuiz();
    }
  }

  getQuiz() {
    this.quizService.obtainQuiz$(this.quizForm.value).pipe(
      tap(quizSet => {
        switch (quizSet.response_code) {
          case 1:
            this.snackbar.open('조건에 맞는 문제 집합이 없습니다!');
            break;
          case 0:
            this.quizService.saveCondition(this.quizForm.value);
            this.solveQuiz(quizSet);
            break;
        }
      }),
      catchError(this.handleError)
    )
    .subscribe();
  }

  async solveQuiz(quizSet: QuizSet) {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.quizService.saveQuiz$(quizSet)
    .pipe()
    .subscribe();
    await new Promise(resolve => setTimeout(resolve, 500));
    this.router.navigateByUrl('/quiz', {state: quizSet});
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error Occurred - Error Code: ${error.status}`));
  }

}
