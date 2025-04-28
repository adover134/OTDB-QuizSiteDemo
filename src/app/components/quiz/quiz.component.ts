import { Component } from '@angular/core';
import { QuizSet, isQuizSet } from '../../interfaces/quizSet';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';
import { isQuiz, Quiz } from '../../interfaces/quiz';
import { CommonModule } from '@angular/common';
import { QuizState, isQuizState } from '../../interfaces/quizState';
import { QuizService } from '../../services/quiz/quiz.service';
import { isQuizResponse, QuizResponse } from '../../interfaces/quizResponse';

@Component({
  selector: 'app-quiz',
  imports: [
    CommonModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  private quizState: QuizState|null = null;

  private solvingStateSubject = new BehaviorSubject<number>(1);
  protected solvingState$ = this.solvingStateSubject.asObservable();

  private currentQuiz = new BehaviorSubject<Quiz|null>(null);
  protected currentQuiz$ = this.currentQuiz.asObservable();

  protected choices = [1, 2, 3, 4];

  constructor(private router: Router, private quizService: QuizService) {
    this.loadQuiz();
  }

  async loadQuiz() {
    try {
      const res = await firstValueFrom(this.quizService.getQuiz$());
      if (!isQuizResponse(res)) {
        this.router.navigateByUrl('/');
        return;
      }
      this.quizState = res.data.result;
      this.nextState();
    } catch (error) {
      console.error(error);
      this.router.navigateByUrl('/');
    }
  }

  nextState() {
    if (this.quizState!.nextQuiz === (this.quizState!.quizNum))
      this.toResult();
    else {
      this.quizState!.nextQuiz = this.quizState!.nextQuiz!+1;
      this.solvingStateSubject.next(1);
      let nextQuiz = this.quizState!.quizSet![this.quizState!.nextQuiz!-1];
      if (nextQuiz.type === 'multiple') this.shuffleChoices();
      this.currentQuiz.next(nextQuiz);
    }
  }
  
  shuffleChoices() {
    this.choices.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer: number) {
    let state: Quiz|null = isQuiz(this.currentQuiz.value)? this.currentQuiz.value:null;
    if (!isQuiz(state))
    {
      console.log('Could not read current quiz');
      this.router.navigateByUrl('/');
      return;
    }
    if (state.type === 'multiple')
    {
      if (this.choices[answer] === 1)
        state.correct = true;
      state.chosen = this.choices[answer];
    }
    else
    {
      if ((state.correct_answer === 'True' && answer === 0) || (state.correct_answer === 'False' && answer === 1))
        state.correct = true;
      state.chosen = answer;
    }
    this.currentQuiz.next(state);
    // 채점 결과 전송
    if(isQuizState(this.quizState))
      this.quizService.saveQuiz$(this.quizState).pipe().subscribe();
    else{
      console.log('Could not save answer');
      this.router.navigateByUrl('/quiz');
    }
    console.log(this.quizState);
    // 상태 갱신
    this.solvingStateSubject.next(2);
  }

  toResult() {
    if (isQuizState(this.quizState))
    {
      this.quizService.saveResult$().pipe().subscribe();
      this.router.navigateByUrl('/result', { state: this.quizState });
    }
    else{
      console.log('Error: current solving was corrupted.');
      this.router.navigateByUrl('/quiz');
    }
  }

  decodeHtmlEntities(str: string) { 
    const textarea = document.createElement('textarea'); 
    textarea.innerHTML = str; 
    return textarea.value; 
  }

  getChoice(n: number): string {
    // n은 인덱스
    if (this.currentQuiz!.value!.type === 'multiple')
      if (this.choices[n] === 1)
        return this.decodeHtmlEntities(this.currentQuiz!.value!.correct_answer);
      else
        return this.decodeHtmlEntities(this.currentQuiz!.value!.incorrect_answers[this.choices[n]-2]);
    else
      if (n === 0)
        return 'O';
      else return 'X';
  }

  getPosition(n: number): object {
    const quiz = this.currentQuiz!.value!;
    const phase = this.solvingStateSubject.value; // 1: 풀이 중, 2: 정답 확인
    const isMultiple = quiz.type === 'multiple';
  
    const base = this.getBasePosition(n, isMultiple, phase);
  
    if (phase === 1) return base;
  
    const isCorrect =
      isMultiple ? this.choices[n] === 1 :
      (quiz.correct_answer === 'True' && n === 0) || (quiz.correct_answer === 'False' && n === 1);
  
    const isChosen = isMultiple ? quiz.chosen === this.choices[n] : quiz.chosen === n;
  
    if (isCorrect) {
      return this.addBorder(base, '#C6C579');
    }
  
    if (!isCorrect && isChosen) {
      return this.addBorder(base, '#FF863B');
    }

    return base;
  }

  private getBasePosition(n: number, isMultiple: boolean, phase: number): { left: string; top: string } {
    if (isMultiple) {
      return {
        left: `${(n % 2) * 285 + (phase === 1 ? 70 : 65)}px`,
        top: `${Math.floor(n / 2) * 150 + (phase === 1 ? 325 : 245)}px`,
      };
    } else {
      return {
        left: `${70 + n * (phase === 1 ? 310 : 305)}px`,
        top: `${phase === 1 ? 325 : 245}px`,
      };
    }
  }
  
  private addBorder(base: { left: string; top: string }, color: string): object {
    return this.moveOffset({
      ...base,
      'border-style': 'solid',
      'border-color': color,
      'border-width': '5px',
    }, 5);
  }
  
  private moveOffset(base: {left: string; top: string, 'border-style'?: string, 'border-color'?: string, 'border-width'?: string }, offset: number): object {
    return {
      ...base,
      top: `${parseInt(base.top!) - offset}px`,
    };
  }
}
