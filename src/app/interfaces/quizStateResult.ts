import { isQuizState, QuizState } from "./quizState";

export interface QuizStateResult {
    result: QuizState;
}

export function isQuizStateResult(qsr: any): qsr is QuizStateResult {
    if (!qsr || typeof qsr !== 'object')
        return false;
    if (!('result' in qsr && Object.prototype.toString.call(qsr.result) === '[object Object]' && isQuizState(qsr.result)))
    {
        console.log(isQuizState(qsr.result));
        return false;
    }
    return true;
}