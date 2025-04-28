import { AuthResult, isAuthResult } from "./authResult";


export interface AuthResponse {
    status: string;
    data: AuthResult;
    statusCode: number;
    timeStamp: Date;
}

export function isAuthResponse(aR: any): aR is AuthResponse{
    if (!aR || typeof aR !== 'object')
    {
        console.log(aR);
        return false;
    }
    if (!('status' in aR && typeof aR.status === 'string'))
    {
        console.log(aR.status);
        return false;
    }
    if (!('data' in aR && isAuthResult(aR.data)))
    {
        console.log(aR.data);
        return false;
    }
    if (!('statusCode' in aR && typeof aR.statusCode === 'number'))
    {
        console.log(aR.statusCode);
        return false;
    }
    if (!('timeStamp' in aR && Object.prototype.toString.call(aR.timeStamp) === '[object String]'))
    {
        console.log(aR.timeStamp);
        console.log(Object.prototype.toString.call(aR.timeStamp));
        return false;
    }
    return true;
}