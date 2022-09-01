// 题目
export const question = '第五关：\n一共有250分，所有人都尝试取走一部分，选1分的一组先取，然后选2分的一组取，以此类推，取完为止。（如果不够一组取，则该组平分剩余积分）';
const meta = {
    total: 250, // 平分总分
    sequence: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], // 取分队列
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   take: 取走数量
    A: {type: 'usually', take: 1, val: '1分'},
    B: {type: 'usually', take: 2, val: '2分'},
    C: {type: 'usually', take: 3, val: '3分'},
    D: {type: 'usually', take: 4, val: '4分'},
    E: {type: 'usually', take: 5, val: '5分'},
    F: {type: 'usually', take: 6, val: '6分'},
    G: {type: 'usually', take: 7, val: '7分'},
    H: {type: 'usually', take: 8, val: '8分'},
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
    let left = meta.total;
    for(const opt of meta.sequence) {
        const take = options[opt].take;
        const count = answer.count(opt)
        const need = take*count;
        if(need >= left) {
            scores[opt] = left/count;
            break;
        }
        left -= need;
        scores[opt] = take;
    }
    return scores;
}