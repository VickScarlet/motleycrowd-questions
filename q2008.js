// 题目
export const question = '第二关：\n请选择一项，但人数最多的一项改为-1分。';
const meta = {
    most: -1,
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', score: 0, val:  '0分'},
    B: {type: 'usually', score: 1, val: '+1分'},
    C: {type: 'usually', score: 2, val: '+2分'},
    D: {type: 'special', score: 3, val: '+3分', rate: 500},
};
// 没有选的人的分数
export const least = -1;

// 判断规则
export const judge = ({answer, picked}) => {
    const scores = {};
    const mosts = new Set(answer.crank()[0]);
    [...picked].forEach(opt=>{
        if(mosts.has(opt))
            scores[opt] = meta.most;
        else
            scores[opt] = options[opt].score;
    });
    return scores;
};