import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'quiz',
        component: QuizComponent,
    },
    {
        path: 'result',
        component: ResultComponent,
    }
];
