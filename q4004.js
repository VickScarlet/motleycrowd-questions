// 题目
export const question = '第四关：\n有个不正经的群，如果乐子人比管理员多，就会导致群被封。你的身份是？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '群友（+2分，如果群被封则改为0分）'},
    B: {type: 'usually', val: '管理员（+2分，如果群被封则改为-2分）'},
    C: {type: 'usually', val: '乐子人（+1分）'},
    D: {type: 'special', val: '审核（-2分，如果群被封则改为+2分）', rate: 500},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    if(answer.count('C') > answer.count('D'))
        return {
            B: {type: 'val', value: -2},
            C: {type: 'val', value: 1},
            D: {type: 'val', value: 2},
        };

    return {
        A: {type: 'val', value: 2},
        B: {type: 'val', value: 2},
        C: {type: 'val', value: 1},
        D: {type: 'val', value: -2},
    }
};