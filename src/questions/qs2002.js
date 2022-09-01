// 题目
export const question = '第二关：\n请选择一项，和选了它的人平分积分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 平分积分
    A: {type: 'usually', score: 5, val: '5分'},
    B: {type: 'usually', score: 4, val: '4分'},
    C: {type: 'usually', score: 3, val: '3分'},
    D: {type: 'usually', score: 2, val: '2分'},
    E: {type: 'usually', score: 1, val: '1分'},
};
// 没有选的人的分数
export const least = 0;
// 超时
export const timeout = 60 * 1000; // 60 seconds

//============================================================
//
//============================================================

/** @type {import('..').judge} 判断规则 */
export const judge = ({answer, picked}) => {
    const scores = {};
    [...picked].forEach(opt=>{
        const count = answer.count(opt);
        if(!count) return;
        scores[opt]=options[opt].score/count;
    });
    return scores;
};