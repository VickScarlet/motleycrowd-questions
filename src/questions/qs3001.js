// 题目
export const question = '第三关：\n你会信任其他人吗？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   trust: 信任 betray: 背叛
    A: {type: 'usually', trust:  1, betray:  1, val: '不信任（+1分）'},
    B: {type: 'usually', trust:  3, betray: -3, val: '信任（+3分，如果有人选了背叛，改为-3分）'},
    C: {type: 'usually', trust: -3, betray: -3, val: '背叛（-3分）'},
};
// 没有选的人的分数
export const least = -3;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('..').judge} 判断规则 */
export const judge = ({answer}) => answer.count('C')>=1? {
    A: options.A.betray,
    B: options.B.betray,
    C: options.C.betray,
} : {
    A: options.A.trust,
    B: options.B.trust,
    C: options.C.trust,
};