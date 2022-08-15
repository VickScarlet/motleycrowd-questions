// 题目
export const question = '第五关：\n现在拍卖200积分。以下有十个团队供你选择，积分乘团队人数就是团队的总出价。这200积分会卖给总出价最高的团队，减去总出价之后再平分，就是队员得到的积分。';
const meta = {
    total: 200,
};
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', offer:  1, val:  '1分'},
    B: {type: 'usually', offer:  2, val:  '2分'},
    C: {type: 'usually', offer:  3, val:  '3分'},
    D: {type: 'usually', offer:  4, val:  '4分'},
    E: {type: 'usually', offer:  5, val:  '5分'},
    F: {type: 'usually', offer:  6, val:  '6分'},
    G: {type: 'usually', offer:  7, val:  '7分'},
    H: {type: 'usually', offer:  8, val:  '8分'},
    I: {type: 'usually', offer:  9, val:  '9分'},
    J: {type: 'usually', offer: 10, val: '10分'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer, picked}) => {
    const rank = [...picked]
        .map(opt=>[answer.count(opt)*options[opt].offer, opt])
        .sort(([a], [b])=>b-a);
    const max = rank[0][0];
    const scores = {};
    for(const [totalOffer, opt] of rank) {
        if(totalOffer != max) return scores;
        scores[opt] = (meta.total-max)/answer.count(opt);
    }
    return scores;
};