// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '国王（+4分，如果被刺杀，则这4分会被刺客平分）'},
    B: {type: 'usually', val: '刺客（比卫兵多就刺杀国王）'},
    C: {type: 'usually', val: '卫兵（+1分，如果有活着的国王，额外+2分）'},
    D: {type: 'usually', val: '仆人（+1分，如果没有活着的国王，额外+1分）'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => ({});