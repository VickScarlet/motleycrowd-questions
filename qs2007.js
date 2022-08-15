import { mutipleForEach, fingerGuessing } from "./functions.js";
// 题目
export const question = '第二关：\n石头剪刀布，人数最多和最少的两项PK，\n赢的+2分，输的-2分。';
const meta = {
    win:   2, // 赢的分
    lose: -2, // 输的分
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   finger: 出拳(0 石头 2 剪刀 5 布)
    A: {type: 'usually', finger: 0, val: '石头'},
    B: {type: 'usually', finger: 2, val: '剪刀'},
    C: {type: 'usually', finger: 5, val: '布'},
    D: {type: 'usually', finger: 0, val: '石头'},
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
        if(!scores[option])
            scores[option] = 0;
        scores[option] += score;
    };

    mutipleForEach(mostAns, leastAns)((a,b)=>{
        const pkRet = fingerGuessing(options[a].finger, options[b].finger);
        addScore(a, pkRet * meta.win);
        addScore(b, pkRet * meta.lose);
    });
    return scores;
};