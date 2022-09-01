import { between } from "../functions.js";
// 题目
export const question = '第五关：\n如果AB两项任务都成功了，则选这两项的人平分15分';
const meta = {
    reward: 15, // 平分总分
    missions: ['A', 'B'], // 任务列表
    other: 'C', // 群众
    enemy: 'D', // 敌人
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    //                  between: 目标 score: 成功分数 faild: 失败分数
    A: {type: 'usually', between: [ 1,       1], val: '任务A（来1个人）'},
    B: {type: 'usually', between: [3, Infinity], val: '任务B（来至少3个人）'},
    C: {type: 'usually', score: 1,                val: '群众（+1分）'},
    D: {type: 'special', score: 2, faild: -2,     val: '敌人（+2分，如果AB两项任务都成功了，改为-2分）', rate: 500},
};
// 没有选的人的分数
export const least = -2;
// 超时
export const timeout = 30 * 1000; // 30 seconds

//============================================================
//
//============================================================

/** @type {import('..').judge} 判断规则 */
export const judge = ({answer}) => {
    const {missions, reward, other, enemy} = meta;
    const scores = {[other]: options[other].score};
    let total = 0;
    for(const opt of missions) {
        const count = answer.count(opt);
        total += count;
        if(between(count,...options[opt].between)) continue;

        scores[enemy] = options[enemy].score;
        return scores;
    }
    scores[enemy] = options[enemy].faild;
    const missionReward = reward/total;
    for(const opt of missions)
        scores[opt] = missionReward;
    return scores;
};