import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OTDBResponse } from '../../interfaces/OTDBResponse';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { QuizRequirements } from '../../interfaces/quizRequirements';
import { Quiz } from '../../interfaces/quiz';
import { QuizSet } from '../../interfaces/quizSet';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getQuiz$(quiz: QuizRequirements): Observable<QuizSet> {
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
                  chosen: 0,
                  correct: false
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
}
