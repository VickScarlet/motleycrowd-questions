import { fingerGuessing } from "./functions.js";
// 题目
export const question = '第三关：\n石头剪刀布，连续玩两次。人数最多和最少的两项PK，\n每赢一次+2分，每输一次-2分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '石头，剪刀', finger: [0, 2]},
    B: {type: 'usually', val: '布，石头', finger: [5, 0]},
    C: {type: 'usually', val: '剪刀，布', finger: [2, 5]},
    D: {type: 'usually', val: '石头，石头', finger: [0, 0]},
};
// 没有选的人的分数
export const least = -4;

// 判断规则
export const judge = ({answer}) => {
    const crank = answer.crank();
    const mostAns = crank[0];
    const leastAns = crank.at(-1);
    if(!mostAns) return {};
    const scores = {};
    const addScore = (option, score)=>{
        if(!scores[option]) {
            scores[option] = {type: 'val', value: score};
            return;
        }
        scores[option].value += score;
    };
    mutipleForEach(mostAns, leastAns)((a,b)=>{
        const pkRet = fingerGuessing(options[a].finger, options[b].finger);
        addScore(a,  2*pkRet);
        addScore(b, -2*pkRet);
    });
    return scores;
};