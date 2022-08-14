import { listRandom } from "./functions.js";
// 题目
export const question = '第二关：\n三族混战，数量最多的+2分，最少的-1分。\n你会加入哪一方？';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '异虫（+15人）'},
    B: {type: 'usually', val: '星灵（每个人相当于1.5个人）'},
    C: {type: 'usually', val: '人类（得失翻倍）'},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    const a = answer.count('A')+15;
    const b = answer.count('B')*1.5;
    const c = answer.count('C');
    const r = [a,b,c].sort((x,y)=>y-x);
    const j = s=>{
        switch (s) {
            case r[0]: return  2;
            case r[2]: return -1;
            default:   return  0;
        }
    }
    return {
        A: {type: 'val', value: j(a)},
        B: {type: 'val', value: j(b)},
        C: {type: 'val', value: j(c)*2},
    };
}