// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   good: 好学生多分数 bad: 坏学生多分数
    A: {type: 'usually', good: 2, bad: -2, val: '老师'},
    B: {type: 'usually', good: 1, bad:  0, val: '好学生（如果比坏学生多，好学生+1分，老师+2分）'},
    C: {type: 'usually', good: 0, bad:  0, val: '坏学生（如果比好学生多，老师-2分）'},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    const b = answer.count('B');
    const c = answer.count('C');
    if(b>c) return {
        A: options.A.good,
        B: options.B.good,
        C: options.C.good,
    };
    if(b<c) return {
        A: options.A.bad,
        B: options.B.bad,
        C: options.C.bad,
    }
    return {};
}