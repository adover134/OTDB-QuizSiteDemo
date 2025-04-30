export interface NumberResponse {
    status: string;
    data: {result: number};
    statusCode: number;
    timeStamp: Date;
}

export function isNumberResponse(qR: any): qR is NumberResponse{
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
    if (!('data' in qR && typeof qR.data === 'object'))
    {
        if (!('result' in qR.data && typeof qR.data.result === 'number'))
        {
            console.log(qR.data.result);
            return false;
        }
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