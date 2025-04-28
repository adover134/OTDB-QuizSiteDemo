import { isQuiz, Quiz } from "./quiz";

export interface QuizState {
    // OTDB API가 반환하는 문제들
    quizSet: Array<Quiz>;
    // 다음 문제의 인덱스 - 커스텀 변수
    nextQuiz: number;
    // 문제의 총 수 - 커스텀 변수
    quizNum: number;
}

export function isQuizState(qS: any): qS is QuizState{
    if (!qS || typeof qS !== 'object')
    {
        console.log(qS);
        return false;
    }
    if (!(Array.isArray(qS.quizSet) && qS.quizSet.every((e:any) => isQuiz(e))))
    {
        console.log(qS.quizSet);
        return false;
    }
    if (!(typeof qS.nextQuiz === 'number'))
    {
        console.log(qS.nextQuiz);
        return false;
    }
    if (!(typeof qS.quizNum === 'number'))
    {
        console.log(qS.quizNum);
        return false;
    }
    return true;
}