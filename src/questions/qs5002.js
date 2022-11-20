// 题目
export const question = '第五关：\n下面有四种方案分配10积分，按人数最多的方案执行。\n执行后选项内部平分得到的积分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   scores: 分配方案
    A: {type: 'usually', scores: {A:4, B:3, C:2, D:1}, val: 'A（A4分，B3分，C2分，D1分）'},
    B: {type: 'usually', scores: {A:2, B:6,       D:2}, val: 'B（A2分，B6分，不给C，D2分）'},
    C: {type: 'usually', scores: {            C:5, D:5}, val: 'C（不给A，不给B，C5分，D5分）'},
    D: {type: 'usually', scores: {A:2.5, B:2.5, C:2.5, D:2.5}, val: 'D（A2.5分，B2.5分，C2.5分，D2.5分）'},
};
// 没有选的人的分数
export const least = 0;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('..').judge} 判断规则 */
export const judge = ({answer}) => {
    const scores = {};
    const addScore = (option, score)=>{
        if(!scores[option]) {
            scores[option] = score;
            return;
        }
        scores[option] += score;
    };

    answer.crank()[0].forEach(option=>{
        const s = options[option].scores;
        for(const o in s)
            if(s[o]) addScore(o, s[o]);
    });
    for(const o in scores) {
        const c = answer.count(o);
        if(!c) delete scores[o];
        else scores[o] = scores[o] / c;
    }

    return scores;
};