// 풀이 결과이다.
export interface SolvingResult {
    amount: number;
    category: number;
    difficulty: string;
    type: string;
    corrects: number;
}

export function isSolvingResult(sR: any): sR is SolvingResult {
    if (!sR || typeof sR !== 'object')
        return false;
    if (!('amount' in sR && typeof sR.amount === 'number'))
    {
        console.log('amount field error');
        return false;
    }
    if (!('category' in sR && typeof sR.amount === 'number'))
    {
        console.log('category field error');
        return false;
    }
    if (!('difficulty' in sR && typeof sR.difficulty === 'string'))
    {
        console.log('difficulty field error');
        return false;
    }
    if (!('type' in sR && typeof sR.type === 'string'))
    {
        console.log('type field error');
        return false;
    }
    if (!('corrects' in sR && typeof sR.corrects === 'number'))
    {
        console.log('corrects field error');
        return false;
    }
    return true;
}