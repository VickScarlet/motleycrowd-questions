// 题目
export const question = '第二关：\n请选择一项，如果选A的人最多，则A、B两项分数互换。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: 'A（+2分）'},
    B: {type: 'usually', val: 'B（-2分）'},
    C: {type: 'usually', val: 'C（0分）'},
    D: {type: 'special', val: 'D（+1分）', rate: 500},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    if(answer.most('A'))
        return {
            A: {type: 'val', value: -2},
            B: {type: 'val', value:  2},
            D: {type: 'val', value:  1},
        };

    return {
        A: {type: 'val', value:  2},
        B: {type: 'val', value: -2},
        D: {type: 'val', value:  1},
    }
}