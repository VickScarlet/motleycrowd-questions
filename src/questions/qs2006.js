// 题目
export const question = '第二关：\n人数最多的选项-1分，\n人数最少的选项+1分';
const meta = {
    most: -1, // 人数最多的分值
    least: 1, // 人数最少的分值
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: 'A'},
    B: {type: 'usually', val: 'B'},
    C: {type: 'usually', val: 'C'},
    D: {type: 'special', val: 'D', rate: 500},
};
// 没有选的人的分数
export const least = -1;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('..').judge} 判断规则 */
export const judge = ({answer}) => {
    const crank = answer.crank();
    const mostAns = crank.shift();
    const leastAns = crank.pop();
    if(!mostAns) return {};
    const scores = {};
    const addScore = base=>opt=>scores[opt]=base;
    mostAns.forEach(addScore(meta.most));

    if(!leastAns) return scores;
    leastAns.forEach(addScore(meta.least));
    return scores;
};