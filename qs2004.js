// 题目
export const question = '第二关：\n三族混战，数量最多的+2分，最少的-1分。\n你会加入哪一方？';
const meta = {
    most:   2,  // 人多的分值
    least: -1,  // 人少的分值
};
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   extra: 额外人数 multiple: 人数倍数 reward: 奖励倍数
    A: {type: 'usually', extra: 2, multiple: 1,   reward: 1, val: '异虫（+2人）'},
    B: {type: 'usually', extra:  0, multiple: 1.5, reward: 1, val: '星灵（每个人相当于1.5个人）'},
    C: {type: 'usually', extra:  0, multiple: 1,   reward: 2, val: '人类（得失翻倍）'},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

// 判断规则
export const judge = ({answer}) => {
    const a = (answer.count('A') + options.A.extra) * options.A.multiple;
    const b = (answer.count('B') + options.B.extra) * options.B.multiple;
    const c = (answer.count('C') + options.C.extra) * options.C.multiple;
    const r = [a,b,c].sort((x,y)=>y-x);
    const j = s=>{
        switch (s) {
            case r[2]: return meta.least;
            case r[0]: return meta.most;
            default:   return 0;
        }
    }
    return {
        A: j(a) * options.A.reward,
        B: j(b) * options.B.reward,
        C: j(c) * options.C.reward,
    };
}