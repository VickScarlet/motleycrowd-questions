// 题目
export const question = '第三关：\n你会信任其他人吗？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '不信任（+1分）'},
    B: {type: 'usually', val: '信任（+3分，如果至少3人选了背叛，改为-3分）'},
    C: {type: 'usually', val: '背叛（-3分）'},
};
// 没有选的人的分数
export const least = -3;

// 判断规则
export const judge = ({answer}) => ({
    A: {type: 'val', value: 1},
    B: {type: 'val', value: answer.count('C')>=3?-3:3},
    C: {type: 'val', value: -3},
});