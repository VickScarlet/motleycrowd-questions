// 题目
export const question = '第四关：\n有A、B两个山口，魏军只要一个山口人更多就获胜。蜀军必须在两个山口都人数更多才能获胜。\n魏军胜利+1分，蜀军胜利+3分，你会加入？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '魏军，去A山口'},
    B: {type: 'usually', val: '魏军，去B山口'},
    C: {type: 'usually', val: '蜀军，去A山口'},
    D: {type: 'usually', val: '蜀军，去B山口'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => {
    const a = answer.count('A');
    const b = answer.count('B');
    const c = answer.count('C');
    const d = answer.count('D');

    if(a<c&&b<d)
        return {
            C: {type: 'val', value: 3},
            D: {type: 'val', value: 3},
        }

    if(a>c||b>d)
        return {
            A: {type: 'val', value: 1},
            B: {type: 'val', value: 1},
        };

    return {};
};