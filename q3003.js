// 题目
export const question = '第三关：\n你会和其他人合作吗？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: 'A（+1分）'},
    B: {type: 'usually', val: 'B（-3分，如果至少20人选了C，改为+3分）'},
    C: {type: 'usually', val: 'C（-3分，如果至少20人选了D，改为+3分）'},
    D: {type: 'usually', val: 'D（-3分，如果至少20人选了B，改为+3分）'},
};
// 没有选的人的分数
export const least = -3;

// 判断规则
export const judge = ({answer}) => ({
    A: {type: 'val', value: 1},
    B: {type: 'val', value: answer.count('C')>=30?3:-3},
    C: {type: 'val', value: answer.count('D')>=30?3:-3},
    D: {type: 'val', value: answer.count('B')>=30?3:-3},
});