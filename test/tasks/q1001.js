import { Question } from '../../index.js';

describe('qs1001', () => {
    it('judge', async () => {
        const question = Question.get('qs1001', 'ABCDEFGH');
        question.answer(0, 'A');
        question.answer(1, 'C');
        question.answer(2, 'H');
        question.answer(3, 'H');
        question.answer(4, 'D');
        question.answer(5, 'B');
        question.answer(6, 'C');
        question.answer(7, 'D');
        question.answer(8, 'A');
        question.answer(9, 'G');
        const scores = question.judge({
            answer: question.answers
        });
    });
});