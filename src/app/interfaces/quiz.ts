export interface Quiz {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;

    // 문제 정답 여부
    correct: boolean;
    // 선택한 답답
    chosen: number;
}

export function isQuiz(q: any): q is Quiz {
    if (!q || typeof q !== 'object')
        return false;
    return (
        'type' in q &&
        typeof q.type === 'string' &&
        'difficulty' in q &&
        typeof q.difficulty === 'string' &&
        'category' in q &&
        typeof q.category === 'string' &&
        'question' in q &&
        typeof q.question === 'string' &&
        'correct_answer' in q &&
        typeof q.correct_answer === 'string' &&
        'incorrect_answers' in q &&
        Array.isArray(q.incorrect_answers) &&
        q.incorrect_answers.every((e:any) => typeof e === 'string') &&
        'correct' in q &&
        typeof q.correct === 'boolean' &&
        'chosen' in q &&
        typeof q.chosen === 'number'
    );
}