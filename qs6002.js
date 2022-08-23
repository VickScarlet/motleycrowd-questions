import { listRandom } from "./functions.js";
// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 分数 surplus: 剩余价值 check: 检查点
    A: {type: 'usually', score: 1, surplus: 2, val: '打工人（+1分，剩余价值+2）'},
    B: {type: 'usually', score: 2, surplus: 4, val: '卷王（+2分，剩余价值+4)'},
    C: {type: 'usually',                       val: '资本家（平分所有剩余价值转化为积分）'},
    D: {type: 'usually', score: 1,             val: '贪官（+1分，如果比资本家少，则夺走资本家一半积分）'},
    E: {type: 'special', score: 3, check: 1,   val: '反腐队长（如果贪官收入大于1，则使贪官收入清零，并且你+3分）', rate: 500},
};
// 没有选的人的分数
export const least = 0;
// 超时
export const timeout = 60 * 1000; // 60 seconds

// 判断规则
export const judge = ({answer}) => {
    const scores = {};
    const a = answer.count('A');
    const b = answer.count('B');
    const c = answer.count('C');
    const d = answer.count('D');
    const e = answer.count('E');

    const surplus = options.A.surplus * a
                  + options.B.surplus * b;

    if(a) scores.A = options.A.score;
    if(b) scores.B = options.B.score;
    if(c) scores.C = surplus/c;
    if(d) {
        const sd = options.D.score;
        if(d<c) {
            scores.C = surplus/2/c;
            scores.D = sd + surplus/2/d;
        } else {
            scores.D = sd;
        }
    }
    if(e && d && scores.D > options.E.check) {
        delete scores.D;
        scores.E = options.E.score;
    }

    return scores;
};