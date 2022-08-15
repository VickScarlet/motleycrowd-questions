import { between } from "./functions.js";
// 题目
export const question = '第五关：\n如果ABC三项任务都成功了，则选这三项的人平分150分';
const meta = {
    reward: 150,
    missions: ['A', 'B', 'C'],
    other: 'D',
    enemy: 'E',
}
// 选项 -[usually 表示常驻]
//      -[special 表示特殊，配合 rate 使用万分率]
export const options = {
    A: {type: 'usually', between: [1,        10], val: '任务A（来1-10个人）'},
    B: {type: 'usually', between: [10,       30], val: '任务B（来10-30个人）'},
    C: {type: 'usually', between: [30, Infinity], val: '任务C（来至少30个人）'},
    D: {type: 'usually', score: 0.5,              val: '群众（+0.5分）'},
    E: {type: 'special', score: 1, faild: -1,     val: '敌人（+1分，如果ABC三项任务都成功了，改为-1分）', rate: 500},
};
// 没有选的人的分数
export const least = -1;

// 判断规则
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