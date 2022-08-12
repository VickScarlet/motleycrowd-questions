// 题目
export const question = '请任意选择一项。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: "A（+2分）"},
    B: {type: 'usually', val: "B（-2分）"},
    C: {type: 'usually', val: "C（0分）"},
    D: {type: 'special', rate: 500, val: "D（+1分）"},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    const mostA = answer.most('A');
    return {
        A: {type: 'val', value: mostA?-2:2},
        B: {type: 'val', value: mostA?2:-2},
        C: {type: 'val', value: 0},
        D: {type: 'val', value: 1},
    };
}