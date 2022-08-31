/**
 * @typedef {Object<string, any>} option
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
    static get(id, picked) {
        if(!metas[id]) return null;
        return new Question(id, picked);
    }

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
    /** @private @type {object} */
    #options;
    /** @private @type {string} */
    #picked;
    /** @private @type {judge} */
    #judge;
    #least;
    #timeout;
    #answers;

    get id() {return this.#id;}
    get question() {return this.#question;}
    get options() {return this.#options;}
    get least() {return this.#least;}
    get counter() {return this.#answers.counter;}
    get size() {return this.#answers.size;}
    get answers() {return this.#answers;}
    get timeout() {return this.#timeout;}
    get picked() {return this.#picked;}

    /**
     * @readonly
     * @typedef {import('./answer').minify} minify
     * @return {[id: string, picked: string, minify: minify]}
     */
    get meta() {return [
        this.#id,
        this.#picked,
        this.#answers.minify
    ];}

    option(option) {
        return this.#options[option];
    }

    answer(uuid, answer) {
        return this.#answers.answer(uuid, answer);
    }

    has(uuid) {
        return this.#answers.has(uuid);
    }

    get(uuid) {
        return this.#answers.get(uuid);
    }

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

    /** @readonly @type {Question[]} */
    get questions() {return Array.from(this.#questions);}
    get size() {return this.#questions.length;}
    get end() {return this.#questions.length <= this.#index;}
    get idx() {return this.#index;}
    get question() {return this.#questions[this.#index];}
    /** @readonly */
    get meta() {
        return this.#questions
            .map(({meta})=>meta);
    }

    at(index) {return this.#questions.at(index);}

    next() {
        if(this.end) return false;
        this.#index++;
        return !this.end;
    }

    /**
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