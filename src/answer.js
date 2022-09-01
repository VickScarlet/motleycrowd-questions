/**
 * @typedef {{[option: string]: number}} minify
 */
import { crank } from './functions.js';
export default class Answer {
    /**
     * @constructor
     * @param {Object} param0
     * @param {string|string[]} param0.options
     */
    constructor({options}) {
        this.#options = new Set([...options]);
        this.#options.forEach(opt=>{
            this.#counter.set(opt, 0);
        });
    }
    /** @private */
    #options;
    /** @private @type {Map<string, string>} */
    #map = new Map();
    /** @private @type {Map<string, number>} */
    #counter = new Map();

    /** @readonly */
    get size() { return this.#map.size; }
    /** @readonly */
    get counter() { return new Map(this.#counter); }
    /** @readonly */
    get map() {return new Map(this.#map);}
    /** @readonly @type {minify} */
    get minify() {
        const counter = {};
        this.#counter.forEach((cnt, opt)=>{
            if(!cnt) return;
            counter[opt] = cnt;
        });
        return counter;
    }

    /**
     * 回答
     * @param {string} uuid
     * @param {string} answer
     */
    answer(uuid, answer) {
        if(this.#map.has(uuid) || !this.#options.has(answer))
            return false;
        this.#map.set(uuid, answer);
        this.#counter.set(answer, this.count(answer)+1);
        return true;
    }

    /**
     * 是否回答
     * @param {string} uuid
     */
    has(uuid) {
        return this.#map.has(uuid);
    }

    /**
     * 获取回答
     * @param {string} uuid
     */
    get(uuid) {
        return this.#map.get(uuid);
    }

    /**
     * 获取计数
     * @param {string} answer
     */
    count(answer) {return this.#counter.get(answer) || 0;}

    /**
     * 是否最多
     * @param {string} answer
     * @param {boolean=} only
     */
    most(answer, only=false) {
        const count = this.count(answer);

        for(const [a, c] of this.#counter) {
            if(a == answer) continue;
            if( c>count || only && c==count)
                return false;
        }
        return true;
    }

    /**
     * 是否最少
     * @param {string} answer
     * @param {boolean=} only
     */
    least(answer, only=false) {
        const count = this.count(answer);

        for(const [a, c] of this.#counter) {
            if(a == answer) continue;
            if( c<count || only && c==count)
                return false;
        }
        return true;
    }

    /**
     * 相同计数回答个数
     * @param {string} answer
     */
    same(answer) {
        const count = this.count(answer);
        let same = 0;

        this.#counter.forEach(option =>{
            if(this.count(option) == count)
                same ++;
        });
        return same;
    }

    /** 最多相同计数个数 */
    maxsame() {
        const map = {};
        this.#options.forEach(option =>{
            const count = this.count(option)
            map[count] = (map[count] || 0) + 1;
        });
        return Math.max(...Object.values(map));
    }

    /**
     * 列排名
     * @returns {string[][]}
     */
    crank() { return crank(this.#counter); }
    /**
     * 选择该选项的用户
     * @param {string} answer
     * @returns {string[]}
     */
    users(answer) {
        const users = [];
        this.#map.forEach((ans, uuid) => {
            if(ans == answer)
                users.push(uuid);
        });
        return users;
    }
}