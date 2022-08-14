import { mutipleForEach, fingerGuessing } from "./functions.js";
// 题目
export const question = '第二关：\n石头剪刀布，人数最多和最少的两项PK，\n赢的+2分，输的-2分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', finger: 0, val: '石头'},
    B: {type: 'usually', finger: 2, val: '剪刀'},
    C: {type: 'usually', finger: 5, val: '布'},
    D: {type: 'usually', finger: 0, val: '石头'},
    E: {type: 'special', finger: 2, val: '剪刀', rate: 500},
    F: {type: 'special', finger: 5, val: '布', rate: 500},
};
// 没有选的人的分数
export const least = -2;

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