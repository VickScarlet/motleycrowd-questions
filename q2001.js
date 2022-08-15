// 题目
export const question = '第二关：\n如果选A的人多，所有选B的人+2分。\n如果选B的人多，所有选B的人-1分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually',                    val: 'A'},
    B: {type: 'usually', more: -1, less: 2, val: 'B'},

};
// 没有选的人的分数
export const least = -1;

// 判断规则
export const judge = ({answer}) => {
    const a = answer.count('A');
    const b = answer.count('B');
    if(b>a) return {B: options.b.more};
    if(b<a) return {B: options.b.less};
    return {};
};