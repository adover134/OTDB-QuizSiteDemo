import { isSolvingResult, SolvingResult } from "./solvingResult";

export interface ResultsResponse {
    status: string;
    data: {result: Array<SolvingResult>};
    statusCode: number;
    timeStamp: Date;
}

export function isResultsResponse(qR: any): qR is ResultsResponse{
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
    if (!('data' in qR && isSolvingResult(qR.data)))
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