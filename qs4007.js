import { between } from "./functions.js";
// 题目
export const question = '第四关：\n请选择一处聚集点，人数超过上限的会被传染，-2分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   safe: 安全范围        faild: 失败分数 extra: 额外范围 exscore: 额外分数
    A: {type: 'usually', safe: [0, 1, true, true], faild: -2,                           val: '阳台（上限1人）'},
    B: {type: 'usually', safe: [0, 2, true, true], faild: -2,                           val: '厨房（上限2人）'},
    C: {type: 'usually', safe: [0, 3, true, true], faild: -2,                           val: '客厅（上限3人）'},
    D: {type: 'usually', safe: [0, 4, true, true], faild: -2,                           val: '小院（上限4人）'},
    E: {type: 'special', safe: [0,  1, true, true], faild: -2,                           val: '卫生间（上限1人）', rate: 500},
    F: {type: 'special', safe: [0,  1, true, true], faild: -2,                           val: '储藏室（上限1人）', rate: 500},
};
// 没有选的人的分数
export const least = -2;

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