// 题目
export const question = '第六关：\n请选择一项身份。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '老师'},
    B: {type: 'usually', val: '好学生（如果比坏学生多，好学生+1分，老师+2分）'},
    C: {type: 'usually', val: '坏学生（如果比好学生多，老师-2分）'},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => ({});