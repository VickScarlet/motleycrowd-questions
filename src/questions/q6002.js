import { listRandom } from "../functions.js";
// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   score: 分数 surplus: 剩余价值 exception: 除名人数 check: 检查点
    A: {type: 'usually', score: 1, surplus: 2,               val: '打工人（+1分，剩余价值+2）'},
    B: {type: 'usually', score: 1, surplus: 1, exception: 1, val: '摸鱼人（+1分，剩余价值+1，但随机1位被优化除名）'},
    C: {type: 'usually', score: 2, surplus: 4, exception: 2, val: '卷王（+2分，剩余价值+4，但随机2位过劳死除名）'},
    D: {type: 'usually',                                     val: '资本家（平分所有剩余价值转化为积分）'},
    E: {type: 'usually', score: 1,                           val: '贪官（+1分，如果比资本家少，则夺走资本家一半积分）'},
    F: {type: 'usually', score: 3, check: 1,                 val: '反腐队长（如果贪官收入大于1，则使贪官收入清零，并且你+3分）'},
    G: {type: 'special',                                     val: '工人领袖（如果比资本家少，则夺走资本家剩余积分，与打工人、摸鱼人、卷王一起平分。）', rate: 500},
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
    const scores = {};
    const a = answer.count('A');
    const b = answer.count('B');
    const c = answer.count('C');
    const d = answer.count('D');
    const e = answer.count('E');
    const f = answer.count('F');
    const g = answer.count('G');

    const eb = options.B.exception;
    const ec = options.C.exception;
    const lb = b>eb?b-eb:0;
    const lc = c>ec?c-ec:0;

    let surplus = options.A.surplus * a;
    if(lb) surplus += options.B.surplus * lb;
    if(lc) surplus += options.C.surplus * lc;

    if(d) scores.D = surplus/d;
    if(e) {
        const se = options.E.score;
        if(e<d) {
            scores.D = surplus/2/d;
            scores.E = se + surplus/2/e;
        } else {
            scores.E = se;
        }
    }
    if(f && e && scores.E>options.F.check) {
        delete scores.E;
        scores.F = options.F.score;
    }

    const abc = reward=>{
        if(a) scores.A = options.A.score + reward;
        if(lb) {
            const pb = new Set(listRandom(answer.users('B'), eb));
            scores.B = ({uuid})=>pb.has(uuid)
                    ?0 :(options.B.score + reward);
        }
        if(lc) {
            const pc = new Set(listRandom(answer.users('C'), ec));
            scores.C = ({uuid})=>pc.has(uuid)
                    ?0 :(options.C.score + reward);
        }
    }
    if(g && g<d) {
        const take = d * scores.D;
        delete scores.D;
        const reward = take / (a + lb + lc + g);
        scores.G = reward;
        abc(reward);
    } else {
        abc(0);
    }

    return scores;
};