
export interface AuthResult {
    result: string;
}

export function isAuthResult(qsr: any): qsr is AuthResult {
    if (!qsr || typeof qsr !== 'object')
        return false;
    if (!('result' in qsr && typeof qsr.result === 'string'))
    {
        return false;
    }
    return true;
}