import { Questions } from '../src/index.js';

export function review({questions, scores, users}) {
    const qs = Questions.pick(questions);
    while(qs.next()) {
        const {idx, question} = qs;
        for (const uuid in scores) {
            const [,ansl] = scores[uuid];
            const ans = ansl[idx];
            if(!Array.isArray(ans)) continue;
            question.answer(uuid, ans[1]);
        }
    }
    return qs.settlement(users);
}