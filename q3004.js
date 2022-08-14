// 题目
export const question = '第三关：\n你会签署和平协议还是发射导弹？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '和平协议（+2分）'},
    B: {type: 'usually', val: '发射导弹（0分，如果至少10人选这项，则和平协议失效）'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => ({
    A: {type: 'val', value: answer.count('B')>=10?0:2},
});