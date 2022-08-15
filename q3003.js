// 题目
export const question = '第三关：\n你会和其他人合作吗？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   success: 成功 faild: 失败 target: 目标
    A: {type: 'usually', success: 1,                             val: 'A（+1分）'},
    B: {type: 'usually', success: 3, faild: -3, target: {C: 20}, val: 'B（-3分，如果至少20人选了C，改为+3分）'},
    C: {type: 'usually', success: 3, faild: -3, target: {D: 20}, val: 'C（-3分，如果至少20人选了D，改为+3分）'},
    D: {type: 'usually', success: 3, faild: -3, target: {B: 20}, val: 'D（-3分，如果至少20人选了B，改为+3分）'},
};
// 没有选的人的分数
export const least = -3;

// 判断规则

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