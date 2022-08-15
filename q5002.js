// 题目
export const question = '第五关：\n下面有四种方案分配100积分，按人数最多的方案执行。\n执行后选项内部平分得到的积分。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                   scores: 分配方案
    A: {type: 'usually', scores: {A:40, B:30, C:20, D:10}, val: 'A（A40分，B30分，C20分，D10分）'},
    B: {type: 'usually', scores: {A:20, B:60,       D:20}, val: 'B（A20分，B60分，不给C，D20分）'},
    C: {type: 'usually', scores: {            C:50, D:50}, val: 'C（不给A，不给B，C50分，D50分）'},
    D: {type: 'usually', scores: {A:25, B:25, C:25, D:25}, val: 'D（A25分，B25分，C25分，D25分）'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => {
    const scores = {};
    const addScore = (option, score)=>{
        if(!scores[option]) {
            scores[option] = 0;
            return;
        }
        scores[option] += score;
    };

    answer.crank()[0].forEach(option=>{
        const s = options[option].scores;
        for(const o in s)
            if(s[o]) addScore(o, s[o]);
    });

    return scores;
};