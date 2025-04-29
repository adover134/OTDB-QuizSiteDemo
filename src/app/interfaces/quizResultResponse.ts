import { isQuizStateResult, QuizStateResult } from "./quizStateResult";

export interface QuizResultResponse {
    status: string;
    data: {corrects: number, total: number};
    statusCode: number;
    timeStamp: Date;
}

export function isQuizResultResponse(qRR: any): qRR is QuizResultResponse{
    if (!qRR || typeof qRR !== 'object')
    {
        console.log(qRR);
        return false;
    }
    if (!('status' in qRR && typeof qRR.status === 'string'))
    {
        console.log(qRR.status);
        return false;
    }
    if (!('data' in qRR && typeof qRR.data === 'object'))
    {
        console.log(qRR.data);
        return false;
    }
    if (!('data' in qRR && typeof qRR.data === 'object'))
    {
        console.log(qRR.data);
        return false;
    }
    if ('data' in qRR && typeof qRR.data === 'object')
    {
        if (!('corrects' in qRR.data && typeof qRR.data.corrects === 'number'))
        {
            console.log(qRR.data);
            return false;
        }
        if (!('total' in qRR.data && typeof qRR.data.corrects === 'number'))
        {
            console.log(qRR.data);
            return false;
        }
    }
    if (!('statusCode' in qRR && typeof qRR.statusCode === 'number'))
    {
        console.log(qRR.statusCode);
        return false;
    }
    if (!('timeStamp' in qRR && Object.prototype.toString.call(qRR.timeStamp) === '[object String]'))
    {
        console.log(qRR.timeStamp);
        console.log(Object.prototype.toString.call(qRR.timeStamp));
        return false;
    }
    return true;
}