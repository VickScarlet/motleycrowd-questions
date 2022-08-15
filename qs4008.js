// 题目
export const question = '第四关：\n可以投资1-3分，投资会使你失去这些积分。\n如果总投资达到10分，返还所有投资人4分。';
const meta = {
    threshold: 10, // 阈值
    reward: 4 // 返还
};
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   invest: 投资分数
    A: {type: 'usually', invest: 0, val: '不投资'},
    B: {type: 'usually', invest: 1, val: '投1分'},
    C: {type: 'usually', invest: 2, val: '投2分'},
    D: {type: 'usually', invest: 3, val: '投3分'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer, picked}) => {
    const sum = [...picked]
        .reduce((s, o)=>s+answer.count(o) * options[o].invest, 0)
    const reward = sum > meta.threshold ? meta.reward : 0;
    return {
        B: reward - options.B.invest,
        C: reward - options.C.invest,
        D: reward - options.D.invest,
    };
};