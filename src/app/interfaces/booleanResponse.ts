export interface BooleanResponse {
    status: string;
    data: {result: boolean};
    statusCode: number;
    timeStamp: Date;
}

export function isBooleanResponse(bR: any): bR is BooleanResponse{
    if (!bR || typeof bR !== 'object')
    {
        console.log(bR);
        return false;
    }
    if (!('status' in bR && typeof bR.status === 'string'))
    {
        console.log(bR.status);
        return false;
    }
    if (!('data' in bR && ('result' in bR.data && typeof bR.data.result === 'boolean')))
    {
        console.log(bR.data);
        return false;
    }
    if (!('statusCode' in bR && typeof bR.statusCode === 'number'))
    {
        console.log(bR.statusCode);
        return false;
    }
    if (!('timeStamp' in bR && Object.prototype.toString.call(bR.timeStamp) === '[object String]'))
    {
        console.log(bR.timeStamp);
        console.log(Object.prototype.toString.call(bR.timeStamp));
        return false;
    }
    return true;
}