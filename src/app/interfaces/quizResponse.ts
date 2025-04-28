import { isQuizStateResult, QuizStateResult } from "./quizStateResult";

export interface QuizResponse {
    status: string;
    data: QuizStateResult;
    statusCode: number;
    timeStamp: Date;
}

export function isQuizResponse(qR: any): qR is QuizResponse{
    if (!qR || typeof qR !== 'object')
    {
        console.log(qR);
        return false;
    }
    if (!('status' in qR && typeof qR.status === 'string'))
    {
        console.log(qR.status);
        return false;
    }
    if (!('data' in qR && isQuizStateResult(qR.data)))
    {
        console.log(qR.data);
        return false;
    }
    if (!('statusCode' in qR && typeof qR.statusCode === 'number'))
    {
        console.log(qR.statusCode);
        return false;
    }
    if (!('timeStamp' in qR && Object.prototype.toString.call(qR.timeStamp) === '[object String]'))
    {
        console.log(qR.timeStamp);
        console.log(Object.prototype.toString.call(qR.timeStamp));
        return false;
    }
    return true;
}