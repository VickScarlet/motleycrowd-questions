import { listRandom } from "./functions.js";
// 题目
export const question = '第三关：\nA队和B队拔河，人多的一方赢。\n你会加入哪一队？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: 'A队（如果赢了，队员平分150分'},
    B: {type: 'usually', val: 'B队（人数+10，如果赢了，队员平分100分'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => {
    const a = answer.count('A');
    const b = answer.count('B') + 10;
    const result = a - b;
    if(result == 0) return {};
    if(result > 0) return { A: {type: 'val', value: 150/a} };
    return { B: {type: 'val', value: 100/b} };
}