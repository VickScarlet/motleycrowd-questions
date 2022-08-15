// 题目
export const question = '第四关：\n人数最接近选项数字的+2分，最远的-1分。';
const meta = {
    nearest:   2, // 最接近
    furthest: -1, // 最远
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                              number: 目标人数
    A: {type: 'usually', val: '1', number: 1 },
    B: {type: 'usually', val: '2', number: 2 },
    C: {type: 'usually', val: '3', number: 3 },
    D: {type: 'usually', val: '4', number: 4 },
    E: {type: 'special', val:  '1.5', number:  1.5, rate: 500},
};
// 没有选的人的分数
export const least = -1;

// 判断规则
export const judge = ({answer, picked}) => {
    const distance = [...picked]
        .map(option=>([
            option,
            Math.abs(answer.count(option) - options[option].number)
        ]))
        .sort(([,a],[,b])=>a-b);

    const min = distance.at( 0)[1];
    const max = distance.at(-1)[1];
    const scores = {};
    distance.forEach(([option, d])=>{
        if(d==max) {
            scores[option] = meta.furthest;
            return;
        }
        if(d==min) {
            scores[option] = meta.nearest;
        }
    });
    return scores;
};