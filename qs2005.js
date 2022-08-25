// 题目
export const question = '第二关：\n人数最多的选项-2分，\n人数最少的选项+2分。';
const meta = {
    most: -2, // 人数最多的分值
    least: 2, // 人数最少的分值
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   extra: 额外分数 reward: 奖励倍数
    A: {type: 'usually', extra:  0,   reward: 1, val: 'A'},
    B: {type: 'usually', extra:  0.5, reward: 1, val: 'B（额外+0.5分）'},
    C: {type: 'usually', extra: -0.5, reward: 1, val: 'C（额外-0.5分）'},
    D: {type: 'usually', extra:  0,   reward: 2, val: 'D（得失翻倍）'},
    E: {type: 'special', extra:  1,   reward: 1, val: 'E（额外+1分）', rate: 500},
    F: {type: 'special', extra:  0,   reward: 1, val: 'F（没什么特别的，只是比A稀有）', rate: 500},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

// 判断规则
export const judge = ({answer, picked}) => {
    const crank = answer.crank();
    const mostAns = crank.shift();
    const leastAns = crank.pop();
    const scores = {};
    [...picked].forEach(opt => {
        scores[opt] = options[opt].extra;
    });
    const addScore = base=>opt=>{
        const {extra, reward} = options[opt];
        scores[opt]= base * reward + extra;
    }

    if(!mostAns) return scores;
    mostAns.forEach(addScore(meta.most));

    if(!leastAns) return scores;
    leastAns.forEach(addScore(meta.least));
    return scores;
};