import { listRandom } from "./functions.js";
// 题目
export const question = '第一关：\n请任意选择一项。';
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', val: '谨慎（+1分）'},
    B: {type: 'usually', val: '公正（选这项的人平分20分）'},
    C: {type: 'usually', val: '团结（如果这项人数最多，+2分）'},
    D: {type: 'usually', val: '智慧（如果这项人数最少，+4分）'},
    E: {type: 'usually', val: '勇气（如果只有你一人选，+8分）'},
    F: {type: 'special', val: '信仰（随机-2、-1、0、+1、+2分）', rate: 500},
    G: {type: 'special', val: '节制（下一题你的分数翻倍）', rate: 500},
    H: {type: 'special', val: '友谊（如果至少2个选项人数相同，+2分）', rate: 500},
    I: {type: 'special', val: '爱情（如果这项与另一项人数相同，+4分）', rate: 500},
    J: {type: 'special', val: '反思（本次比赛中，你的加分改为扣分，扣分改为加分）', rate: 500},
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
    J: {type: 'buf', value: -1},
});