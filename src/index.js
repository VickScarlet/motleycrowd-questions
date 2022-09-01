/**
 * @typedef {Object} option
 * @property {'usually'|'special'} type
 * @property {string} val
 * @property {number=} rate
 * @typedef {{[option: string]: option}} options
 * @typedef {'value'|'buff'|'set'} additionType
 * @typedef { number
 *      | { type: additionType, value: addition }
 *      | ({uuid: string}) => addition
 * } addition
 * @callback judge
 * @param {{
 *      picked: string
 *      answer: Answer
 *      score: Score
 * }} params
 * @return {{[option: string]: addition}}
 */
import * as metas from './questions/meta.js';
import { pool as pools } from './questions/pool.js';
import { listRandom } from './functions.js'

import Answer from "./answer.js";
import Score from "./score.js";

export class Question {
    /**
     * @static
     * @param {string} id
     * @param {string} picked
     * @returns {Question}
     */
    static get(id, picked) {
        if(!metas[id]) return null;
        return new Question(id, picked);
    }

    /**
     * @constructor
     * @param {string} id
     * @param {string} picked
     * @returns {Question}
     */
    constructor(id, picked) {
        const { question, options, least, timeout, judge } = metas[id];
        this.#id = id;
        this.#question = question;
        this.#options = options;
        this.#least = least;
        this.#timeout = timeout;
        this.#judge = judge;

        if(picked) {
            picked = new Set([...picked]);
        } else {
            picked = new Set();
            for(const option in this.#options) {
                const {type, rate} = this.#options[option];
                if(type == 'usually') {
                    picked.add(option);
                    continue;
                }
                if(Math.random()*10000<rate) {
                    picked.add(option);
                }
            }
        }
        this.#picked = [...picked].sort().join('');
        this.#answers = new Answer({options: picked});
    }

    /** @private @type {string} */
    #id;
    /** @private @type {string} */
    #question;
    /** @private @type {options} */
    #options;
    /** @private @type {string} */
    #picked;
    /** @private @type {judge} */
    #judge;
    /** @private @type {number} */
    #least;
    /** @private @type {number} */
    #timeout;
    /** @private @type {Answer} */
    #answers;

    /** @readonly 题号 */
    get id() {return this.#id;}
    /** @readonly 题目 */
    get question() {return this.#question;}
    /** @readonly 选项集 */
    get options() {return this.#options;}
    /** @readonly 最低分 */
    get least() {return this.#least;}
    /** @readonly 选项回答统计 */
    get counter() {return this.#answers.counter;}
    /** @readonly 回答人数 */
    get size() {return this.#answers.size;}
    /** @readonly */
    get answers() {return this.#answers;}
    /** @readonly 超时 */
    get timeout() {return this.#timeout;}
    /** @readonly 可选选项 */
    get picked() {return this.#picked;}

    /**
     * 元数据
     * @readonly
     * @typedef {import('./answer').minify} minify
     * @return {[id: string, picked: string, minify: minify]}
     */
    get meta() {return [
        this.#id,
        this.#picked,
        this.#answers.minify
    ];}

    /**
     * 选项
     * @param {string} option
     */
    option(option) {
        return this.#options[option];
    }

    /**
     * 回答
     * @param {string} uuid
     * @param {string} answer
     */
    answer(uuid, answer) {
        return this.#answers.answer(uuid, answer);
    }

    /**
     * 是否回答
     * @param {string} uuid
     */
    has(uuid) {
        return this.#answers.has(uuid);
    }

    /**
     * 获取回答
     * @param {string} uuid
     */
    get(uuid) {
        return this.#answers.get(uuid);
    }

    /**
     * 评判
     * @param {Score} score
     */
    judge(score) {
        const answer = this.#answers;
        const picked = this.#picked;
        return this.#judge({
            score, answer, picked,
        });
    }
}

/**
 * @typedef {{[uid: string]: [
 *      total: number,
 *      subs: (number | [alter: number, answer: string])[]
 * ]}} settlement
 * @typedef {[id: string, picked: string][]} picks
 */
export class Questions {
    /**
     * @param {number} pool
     */
    static get(pool) {
        const p = pools.get(pool);
        if(!p) return null;
        return this.pick(
            p.map(v=>([listRandom(v)]))
        );
    }

    /**
     * @param {picks} questions
     */
    static pick(questions) {
        return new Questions({questions});
    }

    /**
     * @param {object} params
     * @param {picks}  params.questions
     */
    constructor({questions}) {
        this.#questions = questions.map(
            ([id, picked])=>new Question(id, picked)
        );
    }

    #index = -1;
    /** @private @type {Question[]} */
    #questions;

    /** @readonly 题目列表 */
    get questions() {return Array.from(this.#questions);}
    /** @readonly 题目数 */
    get size() {return this.#questions.length;}
    /** @readonly 是否结束 */
    get end() {return this.#questions.length <= this.#index;}
    /** @readonly 当前题目序号 */
    get idx() {return this.#index;}
    /** @readonly 当前题目 */
    get question() {return this.#questions[this.#index];}
    /** @readonly 元数据 */
    get meta() {
        return this.#questions
            .map(({meta})=>meta);
    }

    /**
     * 根据序号获取题目
     * @param {number} index
     */
    at(index) {return this.#questions.at(index);}

    /**
     * 切下一题
     * @returns {boolean} 是否有下一题
     */
    next() {
        if(this.end) return false;
        this.#index++;
        return !this.end;
    }

    /**
     * 结算
     * @param {string[]} users
     * @return {settlement}
     */
    settlement(users) {
        const score = new Score(users);
        const answers = {};

        for(const question of this.#questions) {
            const scores = question.judge(score);
            users.forEach(uuid=>{
                const data = answers[uuid]
                        || ( answers[uuid] = [] );
                if(!question.has(uuid))
                    return data.push(
                        score.least(uuid, question.least)
                    );

                const ans = question.get(uuid);
                data.push([
                    score.addition(uuid, scores[ans]),
                    ans
                ]);
            });
        }

        const usersScores = {};
        for(const uuid of users)
            usersScores[uuid] = [
                score.get(uuid),
                answers[uuid],
            ];

        return usersScores;
    }
}