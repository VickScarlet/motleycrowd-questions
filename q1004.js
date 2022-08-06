// 题目id
export const id = 'q1001';
// 题目
export const question = '请任意选择一项。';
// 选项
export const options = {
    A: "A（+2分）",
    B: "B（-2分）",
    C: "C（0分）",
    D: "D（+1分）",
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    const mostA = answer.most('A');
    return {
        A: {s: mostA?-2:2},
        B: {s: mostA?2:-2},
        C: {s: 0},
        D: {s: 1},
    };
}