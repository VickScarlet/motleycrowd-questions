import { listRandom } from "../functions.js";
// 题目
export const question = '第五关：\n现有3张传说卡（+1分），10张稀有卡（+0.5分），不限数量的普通卡（0分）。\n限量的卡牌会随机分配给来抢的人，但没抢到卡的人-2分。你的选择是？';
const meta = {
    faild: -2, // 没抢到卡的人
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   stock: 卡片库存,  score: 抢到卡片得分
    A: {type: 'usually', stock:        3, score:   1, val: '抢传说卡'},
    B: {type: 'usually', stock:       10, score: 0.5, val: '抢稀有卡'},
    C: {type: 'usually', stock: Infinity, score:   0, val: '拿保底的普通卡'},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('../index').judge} 判断规则 */
export const judge = ({answer, picked}) => {
    const scores = {};
    [...picked].forEach(option => {
        const count = answer.count(option);
        if(!count) return;

        const {stock, score} = options[option];
        if(stock>=count) {
            if(score) scores[option] = score;
            return;
        }

        const users = answer.users(option);
        const success = new Set(listRandom(users, stock));
        scores[option] = ({uuid})=>success.has(uuid)
            ? score
            : meta.faild;
    });
    return scores;
};