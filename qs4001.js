// 题目
export const question = '第四关：\n从1-10中选一个数，离平均数的三分之二最近的人获胜，获得等于所选数的积分。';
const meta = {
    pointer: 2/3, // 中心点
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                              number: 选项的数值
    A: {type: 'usually', val: '10', number: 10},
    B: {type: 'usually', val:  '9', number:  9},
    C: {type: 'usually', val:  '8', number:  8},
    D: {type: 'usually', val:  '7', number:  7},
    E: {type: 'usually', val:  '6', number:  6},
    F: {type: 'usually', val:  '5', number:  5},
    G: {type: 'usually', val:  '4', number:  4},
    H: {type: 'usually', val:  '3', number:  3},
    I: {type: 'usually', val:  '2', number:  2},
    J: {type: 'usually', val:  '1', number:  1},
};
// 没有选的人的分数
export const least = 0;
// 超时
export const timeout = 60 * 1000; // 60 seconds

// 判断规则
export const judge = ({answer}) => {
    let total = 0;
    let users = 0;
    let numbers = [];
    for(const option in options) {
        const count = answer.count(option);
        const number = options[option].number;
        total += count * number;
        users += count;
        if(count) numbers[number] = option;
    }
    if(!total) return {};
    const pointer = (total / users) * meta.pointer;
    const start = Math.round(pointer);
    const double = start - pointer == 0.5?1:0;

    // 权： 优先向上还是优先向下
    let weight = start > pointer ? -1 : 1;
    let step = 0;
    while(true) {
        const first = start + step * weight;
        const second = start + step * -weight - double;
        const firstOpt = numbers[first];
        const secondOpt = numbers[second];
        if((double || pointer === start)
            && firstOpt && secondOpt) {
            // 如果是整数，则无优先
            return {
                [firstOpt]: {type: 'val', value: first},
                [secondOpt]: {type: 'val', value: second}
            };
        }
        if(firstOpt) return {[firstOpt]: {type: 'val', value: first}};
        if(secondOpt) return {[secondOpt]: {type: 'val', value: second}};
        step++;
    }
};