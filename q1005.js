// 题目id
export const id = 'q1001';
// 题目
export const question = '三族混战，人最多的+2分，最少的-1分。你会加入？';
// 选项
export const options = {
    A: "人类（得失分数翻倍）",
    B: "星灵（每个人相当于1.5个人）",
    C: "异虫（人口+15）",
};
// 没有选的人的分数
export const least = -1;

// 判断规则
export const judge = ({answer}) => {
    const a = answer.count('A');
    const b = answer.count('B')*1.5;
    const c = answer.count('C')+15;
    const r = [a,b,c].sort((x,y)=>y-x);
    const j = s=>{
        switch (s) {
            case r[0]: return {s: 2};
            case r[2]: return {s: -1};
            default: return {s: 0};
        }
    }
    return {
        A: j(a),
        B: j(b),
        C: j(c),
    };
}