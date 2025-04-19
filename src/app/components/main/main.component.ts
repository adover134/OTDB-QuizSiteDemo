import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { QuizCategories } from '../../enums/quizCategories';
import { QuizDifficulties } from '../../enums/quizDifficulties';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AppState } from '../../interfaces/app-state';
import { OTDBResponse } from '../../interfaces/OTDBResponse';
import { MainService } from '../../services/main/main.service';
import { QuizSet } from '../../interfaces/quizSet';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { SnackbarStackService } from '../../services/custom-snackbar/custom-snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  appState$ = new Observable<AppState<OTDBResponse>>;

  protected amount = 10;
  protected categoryValues = Array.from({ length: 33 - 9 + 1 }, (_, i) => i + 9);
  protected categories = QuizCategories;
  protected category = 33;
  protected difficultyValues = Object.values(QuizDifficulties);
  protected difficulty = 'easy';
  protected answerType = 'boolean';

  constructor(private mainService: MainService, private router: Router, private snackbar: SnackbarStackService) { }

  submitForm() {
    if (this.quizForm.valid) {
      // form이 유효할 때만 제출
      this.getQuiz();
    }
  }

  getQuiz() {
    this.mainService.getQuiz$(this.quizForm.value).pipe(
      tap(quizSet => {
        switch (quizSet.response_code) {
          case 1:
            // MatSnackBar로 오류 메시지 출력
            break;
          case 0:
            this.solveQuiz(quizSet);
            break;
        }
      }),
      catchError(this.handleError)
    )
    .subscribe();
}

  solveQuiz(quizSet: QuizSet): void {
    this.router.navigateByUrl('/quiz', {state: quizSet});
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error Occurred - Error Code: ${error.status}`));
  }

}
