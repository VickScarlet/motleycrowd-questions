// 题目
export const question = '第五关：\nAB两车狭路相逢。如果两车都直行则会相撞，所有选直行的人-2分。如果一车直行一车躲避，则在躲避的车中选躲避的人-2分。\nA、B两车按各自人数多的选项行动，你的选择是？';
const meta = { score: -2 }
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: 'A车直行'},
    B: {type: 'usually', val: 'A车躲避'},
    C: {type: 'usually', val: 'B车直行'},
    D: {type: 'usually', val: 'B车躲避'},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('../index').judge} 判断规则 */
export const judge = ({answer}) => {
    const scores = {};
    const score = meta.score;
    const state = (a, b)=>{
        // $: 混合 |: 直行 S: 躲避
        if(a==b) return '$';
        return a>b?'|':'S';
    }
    const A = state(answer.count('A'), answer.count('B'));
    const B = state(answer.count('C'), answer.count('D'));
    switch(A+B) {
        case 'S|': // A躲B直
        case 'S$': // A躲B混
            scores.B = score;
            break;
        case '|S': // A直B躲
        case '$S': // A混B躲
            scores.D = score;
            break;
        case '||': // 双直
            scores.A = score;
            scores.C = score;
            break;
        case '|$': // A直B混
            scores.A = score;
            scores.C = score;
            scores.D = score;
            break;
        case '$|': // A混B直
            scores.A = score;
            scores.B = score;
            scores.C = score;
            break;
        case '$$': // 双混
            scores.A = score;
            scores.B = score;
            scores.C = score;
            scores.D = score;
            break;
    }
    return scores;
};