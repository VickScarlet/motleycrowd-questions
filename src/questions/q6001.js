// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 分数
    A: {type: 'usually', score: 1, val: '奴隶（+1分）'},
    B: {type: 'usually', score: 2, val: '骑士（如果比奴隶少，+2分）'},
    C: {type: 'usually', score: 3, val: '贵族（如果奴隶最多，+3分）'},
    D: {type: 'usually', score: 4, val: '主教（如果骑士最多，+4分）'},
    E: {type: 'special', score: 5, val: '教皇（如果贵族或主教最多，+5分）', rate: 500},
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
    const scores = {A: options.A.score};
    const crank = answer.crank();
    const most = new Set(crank[0]);

    if(answer.count('A')>answer.count('B'))
        scores.B = options.B.score;
    if(most.has('A')) scores.C = options.C.score;
    if(most.has('B')) scores.D = options.D.score;
    if(most.has('C')||most.has('D'))
        scores.E = options.E.score;

    return scores;
};