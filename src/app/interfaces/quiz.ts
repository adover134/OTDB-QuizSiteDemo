export interface Quiz {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;

    // 문제 정답 여부
    correct: boolean;
    // 선택한 답
    chosen: number;
}

export function isQuiz(q: any): q is Quiz {
    if (!q || typeof q !== 'object')
        return false;
    if (!('type' in q && typeof q.type === 'string'))
        return false;
    if (!('difficulty' in q && typeof q.difficulty === 'string'))
        return false;
    if (!('category' in q && typeof q.category === 'string'))
        return false;
    if (!('question' in q && typeof q.question === 'string'))
        return false;
    if (!('correct_answer' in q && typeof q.correct_answer === 'string'))
        return false;
    if (!('incorrect_answers' in q && Array.isArray(q.incorrect_answers) && q.incorrect_answers.every((e:any) => typeof e === 'string')))
        return false;
    if (!('correct' in q && typeof q.correct === 'boolean'))
        return false;
    if (!('chosen' in q && typeof q.chosen === 'number'))
        return false;
    return true;
}