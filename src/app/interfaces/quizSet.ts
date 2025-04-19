import { isQuiz, Quiz } from "./quiz";

export interface QuizSet {
    response_code: number;
    // OTDB API가 반환하는 문제들
    quizSet?: Array<Quiz>;
    // 다음 문제의 인덱스 - 커스텀 변수
    nextQuiz?: number;
    // 문제의 총 수 - 커스텀 변수
    quizNum?: number;
}

export function isQuizSet(qS: any): qS is QuizSet{
    if (!qS || typeof qS !== 'object')
        return false;
    if (!('response_code' in qS && typeof qS.response_code === 'number'))
        return false;
    if ('quizSet' in qS) {
        if (!(Array.isArray(qS.quizSet) && qS.quizSet.every((e:any) => isQuiz(e))))
            return false;
    }
    if ('nextQuiz' in qS) {
        if (!(typeof qS.nextQuiz === 'number'))
            return false;
    }
    if ('quizNum' in qS) {
        if (!(typeof qS.quizNum === 'number'))
            return false;
    }
    return true;
}