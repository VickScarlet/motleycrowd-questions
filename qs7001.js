// 题目
export const question = '第七关：\n请任意选择一项。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '如果你是目前总积分最高的人，总积分变为0'},
    B: {type: 'usually', val: '-0.5分'},
};
// 没有选的人的分数
export const least = -0.5;

// 判断规则
export const judge = ({answer}) => ({});