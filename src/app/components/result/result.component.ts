import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarStackService } from '../../services/custom-snackbar/custom-snackbar.service';
import { Quiz } from '../../interfaces/quiz';
import { isQuizState, QuizState } from '../../interfaces/quizState';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  private result: QuizState|null;

  protected correct_answers_num: number;
  protected quiz_num: number;

  constructor (private router: Router, private snackbar: SnackbarStackService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (isQuizState(state))
      this.result = state;
    else
    {
      this.result = null;
      this.toMain();
    }
    this.correct_answers_num = (this.result!.quizSet!.filter((e: Quiz) => e.correct === true)).length;
    this.quiz_num = this.result!.quizNum!;
  }

  toMain() {
    this.router.navigateByUrl('/');
  }
}
