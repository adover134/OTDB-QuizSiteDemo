import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizSet } from '../../interfaces/quizSet';
import { QuizResponse } from '../../interfaces/quizResponse';
import { QuizState } from '../../interfaces/quizState';
import { QuizRequirements } from '../../interfaces/quizRequirements';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { OTDBResponse } from '../../interfaces/OTDBResponse';
import { Quiz } from '../../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizCondition = new BehaviorSubject<QuizRequirements | null> (null);
  protected quizCondition$ = this.quizCondition.asObservable();

  constructor(private http: HttpClient) { }

  saveQuiz$(q: QuizSet|QuizState) {
    return this.http.post('http://localhost:8080/quiz/save',
      {
        quizSet: q.quizSet,
        nextQuiz: q.nextQuiz,
        quizNum: q.quizNum
      },
      {headers: new HttpHeaders({"Content-Type": "application/json"}), withCredentials: true}
    );
  }

  obtainQuiz$(quiz: QuizRequirements): Observable<QuizSet> {
		var OTDBUrl = `https://opentdb.com/api.php?amount=${quiz.amount}&difficulty=${quiz.difficulty}&type=${quiz.type}`;
		if (quiz.category !== 33)
      OTDBUrl = OTDBUrl+`&category=${quiz.category}`;
    console.log(OTDBUrl);
    return this.http.get<OTDBResponse> (`${OTDBUrl}`)
      .pipe(
        map(response => {
          if (response.response_code === 0)
          {
            return {
              response_code: response.response_code,
              quizSet: response.results.map(
                (q):Quiz => ({
                  type: q.type,
                  difficulty: q.difficulty,
                  category: q.category,
                  question: q.question,
                  correct_answer: q.correct_answer,
                  incorrect_answers: q.incorrect_answers,
                  correct: false,
                  chosen: 0
                })
              ),
              nextQuiz: 0,
              quizNum: quiz.amount
            }
          }
          else {
            return {
              response_code: response.response_code
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error Occurred - Error Code: ${error.status}`));
  }

  getQuiz$() {
    return this.http.get<QuizResponse> ('http://localhost:8080/quiz/current', {withCredentials: true});
  }

  saveResult$() {
    return this.http.get<Response> ('http://localhost:8080/quiz/save_result', {withCredentials: true});
  }

}
