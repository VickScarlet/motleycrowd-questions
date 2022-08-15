// 题目
export const question = '第二关：\n请选择一项，如果选A的人最多，则A、B两项分数互换。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 分数
    A: {type: 'usually', score:  2, val: 'A（+2分）'},
    B: {type: 'usually', score: -2, val: 'B（-2分）'},
    C: {type: 'usually', score:  0, val: 'C（0分）'},
    D: {type: 'special', score:  1, val: 'D（+1分）', rate: 500},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => answer.most('A') ? {
    A: options.A.score,
    B: options.B.score,
    C: options.C.score,
    D: options.D.score,
} : {
    A: options.B.score,
    B: options.A.score,
    C: options.C.score,
    D: options.D.score,
};