import { between } from "./functions.js";
// 题目
export const question = '第四关：\n达成选项要求的+2分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '来1-20个人',  success: 2, between: [ 1, 20, true, true]},
    B: {type: 'usually', val: '来10-30个人', success: 2, between: [10, 30, true, true]},
    C: {type: 'usually', val: '来20-40个人', success: 2, between: [20, 40, true, true]},
    D: {type: 'usually', val: '来30-50个人', success: 2, between: [30, 50, true, true]},
    E: {type: 'special', val: '来1-5个人',   success: 2, between: [ 1,  5, true, true], rate: 500},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer, picked}) => {
    const scores = {};
    [...picked].forEach(opt=> {
        if(!between(answer.count(opt), ...options[opt].between)) return;
        scores[opt] = options[opt].success;
    });
    return scores;
};