// 题目id
export const id = 'q1001';
// 题目
export const question = '请任意选择一项。';
// 选项
export const options = {
    A: '谨慎（+1分）',
    B: '公正（所有选公正的人平分20分）',
    C: '团结（如果选团结的人最多，+2分）',
    D: '智慧（如果选智慧的人最少，+4分）',
    E: '勇气（如果只有你一人选勇气，+8分）',
    F: '信仰（随机从-2、-1、0、+1、+2分中选一个）',
    G: '克制（你在下一题中的积分翻倍）',
    H: '友谊（如果有两个选项的人数相同，+2分）',
    I: '爱情（如果选爱情的人数与另一个选项人数相同，+4分）',
    J: '坚固（如果恰好有3个选项人数相同，+3分',
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => ({
    A: {s: 1},
    B: {s: 20 / answer.count('B')},
    C: {s: answer.most('C')?2:0},
    D: {s: answer.least('D')?4:0},
    E: {s: answer.count('E')==1?8:0},
    F: {s: ()=>listRandom([-2,-1,0,1,2])},
    G: {b: 2},
    H: {s: answer.maxsame()>=2?2:0},
    I: {s: answer.same('I')>=2?4:0},
    J: {s: answer.maxsame()===3?3:0},
});