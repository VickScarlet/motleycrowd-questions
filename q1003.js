// 题目
export const question = '选择一项，和选择该选项的其他人平分对应的积分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: "50分"},
    B: {type: 'usually', val: "40分"},
    C: {type: 'usually', val: "30分"},
    D: {type: 'usually', val: "20分"},
    E: {type: 'usually', val: "10分"},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => ({
    A: {type: 'val', value: 50 / answer.count('A')},
    B: {type: 'val', value: 40 / answer.count('B')},
    C: {type: 'val', value: 30 / answer.count('C')},
    D: {type: 'val', value: 20 / answer.count('D')},
    E: {type: 'val', value: 10 / answer.count('E')},
});