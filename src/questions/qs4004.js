// 题目
export const question = '第四关：\n有个不正经的群，如果乐子人比管理员多，就会导致群被封。你的身份是？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   safe: 群安全 boom: 群被封
    A: {type: 'usually', safe:  2, boom:  0, val: '群友（+2分，如果群被封则改为0分）'},
    B: {type: 'usually', safe:  2, boom: -2, val: '管理员（+2分，如果群被封则改为-2分）'},
    C: {type: 'usually', safe:  1, boom:  1, val: '乐子人（+1分）'},
    D: {type: 'special', safe: -2, boom:  2, val: '审核（-2分，如果群被封则改为+2分）', rate: 500},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('../index').judge} 判断规则 */
export const judge = ({answer}) => answer.count('C') > answer.count('B') ? {
    A: options.A.boom,
    B: options.B.boom,
    C: options.C.boom,
    D: options.D.boom,
} : {
    A: options.A.safe,
    B: options.B.safe,
    C: options.C.safe,
    D: options.D.safe,
};