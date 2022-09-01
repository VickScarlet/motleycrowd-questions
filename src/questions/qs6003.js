// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 分数 extra: 额外分数
    A: {type: 'usually', score: 4,            val: '国王（+4分，如果被刺杀，则这4分会被刺客平分）'},
    B: {type: 'usually',                      val: '刺客（比卫兵多就刺杀国王）'},
    C: {type: 'usually', score: 1, extra:  2, val: '卫兵（+1分，如果有活着的国王，额外+2分）'},
    D: {type: 'usually', score: 2, extra: -1, val: '仆人（+1分，如果没有活着的国王，额外+1分）'},
};
// 没有选的人的分数
export const least = 0;
// 超时
export const timeout = 60 * 1000; // 60 seconds

//============================================================
//
//============================================================

/** @type {import('../index').judge} 判断规则 */
export const judge = ({answer}) => {
    const a = answer.count('A');
    const b = answer.count('B');
    const c = answer.count('C');
    const sa = options.A.score;
    const sc = options.C.score;
    const sd = options.D.score;
    return (!a || b>c) ? {
        B: sa * a / b,
        C: sc,
        D: sd,
    } : {
        A: sa,
        C: sc + options.C.extra,
        D: sd + options.D.extra,
    }
};