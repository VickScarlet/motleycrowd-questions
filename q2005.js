// 题目
export const question = '第二关：\n人数最多的选项-2分，\n人数最少的选项+2分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: 'A'},
    B: {type: 'usually', val: 'B（额外+0.5分）'},
    C: {type: 'usually', val: 'C（额外-0.5分）'},
    D: {type: 'usually', val: 'D（得失翻倍）'},
    E: {type: 'special', val: 'E（额外+1分）', rate: 500},
    F: {type: 'special', val: 'F（没什么特别的，只是比A稀有）', rate: 500},
};
// 没有选的人的分数
export const least = -2;

// 判断规则
export const judge = ({answer}) => {
    const crank = answer.crank();
    const mostAns = crank.shift();
    const leastAns = crank.pop();
    const scores = {};
    if(!mostAns) return scores;
    mostAns.forEach(option=>{
        let value;
        switch(option){
            case 'F':
            case 'A': value = -2; break;
            case 'B': value = -1.5; break;
            case 'C': value = -2.5; break;
            case 'D': value = -4; break;
            case 'E': value = -1; break;
            default: return;
        }
        scores[option] = {type: 'val', value};
    });

    if(!leastAns) return scores;
    leastAns.forEach(option=>{
        let value;
        switch(option){
            case 'F':
            case 'A': value = 2; break;
            case 'B': value = 2.5; break;
            case 'C': value = 1.5; break;
            case 'D': value = 4; break;
            case 'E': value = 3; break;
            default: return;
        }
        scores[option] = {type: 'val', value};
    });
    return scores;
};