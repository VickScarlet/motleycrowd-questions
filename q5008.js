// 题目
export const question = `第五关：
齐威王和田忌各有上中下三匹马，一共赛跑三轮。如果同等的马赛跑，田忌的跑不过齐威王的。
如果你支持齐威王的任何一匹马，齐威王每赢一轮你就+1分。
如果支持田忌，田忌每赢一轮你就+2分。
你支持谁？
双方人气最高的马将出战第一轮，第二高的马出战第二轮，最低的出战第三轮。
如果人气相同，则等级高的马先出战。`;
const meta = {
    qi: 1,   // 齐威王赢一轮加分
    tian: 2, // 田忌赢一轮加分
    bo: 3,   // 伯乐加分
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '齐威王 上等马'},
    B: {type: 'usually', val: '齐威王 中等马'},
    C: {type: 'usually', val: '齐威王 下等马'},
    D: {type: 'usually', val: '田忌 上等马'},
    E: {type: 'usually', val: '田忌 中等马'},
    F: {type: 'usually', val: '田忌 下等马'},
    G: {type: 'special', val: '伯乐（如果任何一方上等马人气最高，+3分）', rate: 500},
};
// 没有选的人的分数
export const least = 0;
// 超时
export const timeout = 60 * 1000; // 60 seconds

// 判断规则
export const judge = ({answer}) => {
    // 1: 上等马 2: 中等马 3: 下等马
    const sequence = (l1, l2, l3)=>
        [[l1, 1], [l2, 2], [l3, 3]]
            .sort(([x], [y])=>y-x)
            .map(([,x])=>x);

    const a = sequence(answer.count('A'), answer.count('B'), answer.count('C'));
    const b = sequence(answer.count('D'), answer.count('E'), answer.count('F'));

    const scores = {};
    if(a[0]==1||b[0]==1) {
        scores.G = meta.bo
    }

    const addScore = (isQi, score)=>Array
        .from(isQi?'ABC':'DEF')
        .forEach(opt=>scores[opt] = score);

    // qi1 qi2 qi3 tian1 tian2 tian3
    // qi1 vs tian1, qi2 vs tian2, qi3 vs tian3
    switch(a.join('')+b.join('')) {
        case '123123':
        case '132132':
        case '213213':
        case '231231':
        case '312312':
        case '321321':
            addScore(true, meta.qi * 3);
            break;
        case '123231':
        case '132213':
        case '231312':
        case '213321':
        case '312123':
        case '321132':
            addScore(true, meta.qi * 2);
            addScore(false, meta.tian);
            break;
        case '123312':
        case '132321':
        case '231123':
        case '213132':
        case '312231':
        case '321213':
            addScore(true, meta.qi);
            addScore(false, meta.tian * 2);
            break;
    }

    return scores;
};