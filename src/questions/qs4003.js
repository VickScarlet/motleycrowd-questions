// 题目
export const question = '第四关：\n坏老人摔倒了，有好心人去扶，好心人+2分。\n但是如果没有围观群众，好心人不但不加分，还会被敲诈-2分给坏老人平分。\n你的身份是？';
const meta = {
    target: 1, // 群众目标
    success: 2, // 好心人加分
    fail:   -2, // 好心人被讹
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '坏老人'},
    B: {type: 'usually', val: '好心人'},
    C: {type: 'usually', val: '围观群众'},
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
    if(answer.count('C')>=meta.target)
        return { B: meta.success };

    return {
        A: (-meta.fail)*answer.count('B')/answer.count('A'),
        B: meta.fail,
    }
};