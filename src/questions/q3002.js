// 题目
export const question = '第三关：\n你会和其他人合作吗？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   success: 成功 faild: 失败 target: 目标
    A: {type: 'usually', success: 1,                                    val: 'A（+1分）'},
    B: {type: 'usually', success: 3, faild: -3, target: {C: 30},        val: 'B（-3分，如果至少30人选了C，改为+3分）'},
    C: {type: 'usually', success: 3, faild: -3, target: {B: 30},        val: 'C（-3分，如果至少30人选了B，改为+3分）'},
    D: {type: 'special', success: 2, faild:  0, target: {B: 30, C: 30}, val: 'D（如果B和C都有至少30人，+2分）', rate: 500},
};
// 没有选的人的分数
export const least = -3;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('..').judge} 判断规则 */
export const judge = ({answer, picked}) => {
    const scores = {};
    [...picked].forEach(opt=>{
        const {success, faild, target} = options[opt];
        if(!target) {
            scores[opt] = success;
            return;
        }
        for(const o in target) {
            if(answer.count(o) < target[o]) {
                scores[opt] = faild;
                return;
            }
        }
        scores[opt] = success;
    });
    return scores;
};