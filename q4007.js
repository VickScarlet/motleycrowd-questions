import { between } from "./functions.js";
// 题目
export const question = '第四关：\n请选择一处聚集点，人数超过上限的会被传染，-2分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   safe: 安全范围        faild: 失败分数 extra: 额外范围 exscore: 额外分数
    A: {type: 'usually', safe: [0, 10, true, true], faild: -2,                           val: '车棚（上限10人）'},
    B: {type: 'usually', safe: [0, 20, true, true], faild: -2,                           val: '集装箱（上限20人）'},
    C: {type: 'usually', safe: [0, 30, true, true], faild: -2,                           val: '小诊所（上限30人）'},
    D: {type: 'usually', safe: [0, 40, true, true], faild: -2,                           val: '超市（上限40人）'},
    E: {type: 'special', safe: [0,  1, true, true], faild: -2,                           val: '卫生间（上限1人）', rate: 500},
    F: {type: 'special', safe: [0,  3, true, true], faild: -2,                           val: '地下室（上限3人）', rate: 500},
    G: {type: 'special', safe: [0,  5, true, true], faild: -2, extra: [5,5], exscore: 2, val: '网吧（上限5人，如果恰好5人，额外+2分）', rate: 500},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

// 判断规则
export const judge = ({answer, picked}) => {
    const scores = {};
    [...picked].forEach(opt=> {
        const {safe, faild, extra, exscore} = options[opt];
        if(extra && between(answer.count(opt), ...extra)) {
            scores[opt] = exscore;
            return;
        }
        if(between(answer.count(opt), ...safe)) return;
        scores[opt] = faild;
    });
    return scores;
};