import { Quiz } from "./quiz";

export interface QuizRequirements {
    amount: number;
    category: number;
    difficulty: string;
    type: string;
}

export function isQuizRequirements (qR: any): qR is QuizRequirements {
    if (!qR || typeof qR !== 'object')
        return false;
    if (!('amount' in qR && typeof qR.amount === 'number'))
        return false;
    if (!('category' in qR && typeof qR.category === 'number'))
        return false;
    if (!('difficulty' in qR && typeof qR.difficulty === 'string'))
        return false;
    if (!('type' in qR && typeof qR.type === 'string'))
        return false;
    return true;
}