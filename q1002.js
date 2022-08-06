// 题目id
export const id = 'q1002';
// 题目
export const question = '如果选A的人多，所有选B的人+2分。\n如果选B的人多，所有选B的人-1分。';
// 选项
export const options = {
    A: 'A',
    B: 'B',
};
// 没有选的人的分数
export const least = -1;

// 判断规则
export const judge = ({answer}) => ({
    A: {s: 0},
    B: {s: answer.most('A')?2:-1},
});