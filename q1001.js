import { listRandom } from "./functions.js";
// 题目
export const question = '请任意选择一项。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '谨慎（+1分）'},
    B: {type: 'usually', val: '公正（所有选公正的人平分20分）'},
    C: {type: 'usually', val: '团结（如果选团结的人最多，+2分）'},
    D: {type: 'usually', val: '智慧（如果选智慧的人最少，+4分）'},
    E: {type: 'usually', val: '勇气（如果只有你一人选勇气，+8分）'},
    F: {type: 'special', rate: 500, val: '信仰（随机从-2、-1、0、+1、+2分中选一个）'},
    G: {type: 'special', rate: 500, val: '克制（你在下一题中的积分翻倍）'},
    H: {type: 'special', rate: 500, val: '友谊（如果有两个选项的人数相同，+2分）'},
    I: {type: 'special', rate: 500, val: '爱情（如果选爱情的人数与另一个选项人数相同，+4分）'},
    J: {type: 'special', rate: 500, val: '坚固（如果恰好有3个选项人数相同，+3分'},
};
// 没有选的人的分数
export const least = 0;

// 判断规则
export const judge = ({answer}) => ({
    A: {type: 'val', value: 1},
    B: {type: 'val', value: 20 / answer.count('B')},
    C: {type: 'val', value: answer.most('C')?2:0},
    D: {type: 'val', value: answer.least('D')?4:0},
    E: {type: 'val', value: answer.count('E')==1?8:0},
    F: {type: 'val', value: ()=>listRandom([-2,-1,0,1,2])},
    G: {type: 'buf', value: 2},
    H: {type: 'val', value: answer.maxsame()>=2?2:0},
    I: {type: 'val', value: answer.same('I')>=2?4:0},
    J: {type: 'val', value: answer.maxsame()===3?3:0},
});