import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarStackService } from '../../services/custom-snackbar/custom-snackbar.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { map } from 'rxjs';
import { isQuizResultResponse } from '../../interfaces/quizResultResponse';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  protected correct_answers_num: number = 0;
  protected quiz_num: number = 0;

  constructor (private router: Router, private snackbar: SnackbarStackService, private quizService: QuizService) {
    this.quizService.getResult$()
    .pipe(map(res => {
      if(isQuizResultResponse(res))
      {
        this.correct_answers_num = res.data.corrects;
        this.quiz_num = res.data.total;
      }
      else
        this.handleError();
    }))
    .subscribe();
    this.quizService.getResults$(1).subscribe(res => console.log(res));
  }

  async handleError() {
    this.snackbar.open('잘못된 접근입니다.');
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.toMain();
  }

  toMain() {
    this.router.navigateByUrl('/'); 
  }
}
