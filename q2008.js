// 题目
export const question = '第二关：\n请选择一项，但人数最多的一项改为-1分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val:  '0分'},
    B: {type: 'usually', val: '+1分'},
    C: {type: 'usually', val: '+2分'},
    D: {type: 'special', val: '+3分', rate: 500},
};
// 没有选的人的分数
export const least = -1;

// 判断规则
export const judge = ({answer}) => {
    const scores = {
        B: {type: 'val', value: 1},
        C: {type: 'val', value: 2},
        D: {type: 'val', value: 3},
    }
    for(const option of answer.crank()[0]) {
        scores[option] = {type: 'val', value: -1};
    }
    return scores;
};