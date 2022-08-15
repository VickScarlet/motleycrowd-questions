// 题目
export const question = '第三关：\nA队和B队拔河，人多的一方赢。\n你会加入哪一队？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   extra: 额外人数 total: 平分总分
    A: {type: 'usually', extra:  0, total: 150, val: 'A队（如果赢了，队员平分150分'},
    B: {type: 'usually', extra: 10, total: 100, val: 'B队（人数+10，如果赢了，队员平分100分'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => {
    const a = answer.count('A') + options.A.extra;
    const b = answer.count('B') + options.B.extra;
    const result = a - b;
    if(result == 0) return {};
    if(result > 0) return {A: options.A.total/a};
    return {B: options.B.total/b};
}