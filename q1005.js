// 题目
export const question = '三族混战，人最多的+2分，最少的-1分。你会加入？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: "人类（得失分数翻倍）"},
    B: {type: 'usually', val: "星灵（每个人相当于1.5个人）"},
    C: {type: 'usually', val: "异虫（人口+15）"},
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
        let value;
        switch (s) {
            case r[0]: value =  2; break;
            case r[2]: value = -1; break;
            default:   value =  0; break;
        }
        return {type: 'val', value};
    }
    return {
        A: j(a),
        B: j(b),
        C: j(c),
    };
}