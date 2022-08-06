// 题目id
export const id = 'q1003';
// 题目
export const question = '选择一项，和选择该选项的其他人平分对应的积分。';
// 选项
export const options = {
    A: "50分",
    B: "40分",
    C: "30分",
    D: "20分",
    E: "10分",
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => ({
    A: {s: 50 / answer.count('A')},
    B: {s: 40 / answer.count('B')},
    C: {s: 30 / answer.count('C')},
    D: {s: 20 / answer.count('D')},
    E: {s: 10 / answer.count('E')},
});