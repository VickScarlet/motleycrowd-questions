import { listRandom } from "../functions.js";
// 题目
export const question = '第一关：\n请任意选择一项。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 分值
    A: {type: 'usually', score: 1,                                          val: '谨慎（+1分）'},
    B: {type: 'usually', score: 20,                                         val: '公正（选这项的人平分20分）'},
    C: {type: 'usually', score: 2,                                          val: '团结（如果这项人数最多，+2分）'},
    D: {type: 'usually', score: 4,                                          val: '智慧（如果这项人数最少，+4分）'},
    E: {type: 'usually', score: 8,                                          val: '勇气（如果只有你一人选，+8分）'},
    F: {type: 'special', score: [-2, -1, 0, 1, 2],                          val: '信仰（随机-2、-1、0、+1、+2分）', rate: 500},
    G: {type: 'special', score: {type: 'buff', times: 1,        value:  2}, val: '节制（下一题你的分数翻倍）', rate: 500},
    H: {type: 'special', score: 2,                                          val: '友谊（如果至少2个选项人数相同，+2分）', rate: 500},
    I: {type: 'special', score: 4,                                          val: '爱情（如果这项与另一项人数相同，+4分）', rate: 500},
    J: {type: 'special', score: {type: 'buff', times: Infinity, value: -1}, val: '反思（本次比赛中，你的加分改为扣分，扣分改为加分）', rate: 500},
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
    const scores = {
        A: options.A.score,
        F: ()=>listRandom(options.F.score),
        G: options.G.score,
        J: options.J.score,
    };
    const b = answer.count('B');
    if(b) scores.B = options.B.score / b;
    if(answer.most('C')) scores.C = options.C.score;
    if(answer.least('D')) scores.D = options.D.score;
    if(answer.count('E') === 1) scores.E = options.E.score;
    if(answer.maxsame() >= 2) scores.H = options.H.score;
    if(answer.same('I') >= 2) scores.I = options.I.score;
    return scores;
};