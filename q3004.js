// 题目
export const question = '第三关：\n你会签署和平协议还是发射导弹？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   success: 成功 faild: 失败 target: 目标
    A: {type: 'usually', success: 0, faild: 2, target: {B: 10}, val: '和平协议（+2分）'},
    B: {type: 'usually', success: 0,                            val: '发射导弹（0分，如果至少10人选这项，则和平协议失效）'},
};
// 没有选的人的分数
export const least = 0;

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