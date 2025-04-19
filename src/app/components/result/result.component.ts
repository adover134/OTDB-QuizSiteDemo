import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isQuizSet, QuizSet } from '../../interfaces/quizSet';
import { SnackbarStackService } from '../../services/custom-snackbar/custom-snackbar.service';
import { isQuiz, Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  private result: QuizSet|null;

  protected correct_answers_num: number;
  protected quiz_num: number;

  constructor (private router: Router, private snackbar: SnackbarStackService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (isQuizSet(state))
      this.result = state;
    else
    {
      this.result = null;
      // 오류 발생 메시지 - '잘못된 접근입니다' 띄우기!
      // 3초 후에 이동!
      this.router.navigateByUrl('/');
    }
    this.correct_answers_num = (this.result!.quizSet!.filter((e: Quiz) => e.correct === true)).length;
    this.quiz_num = this.result!.quizNum!;
  }

  toMain() {
    this.router.navigateByUrl('/');
  }
}
