/**
 * @typedef {'value'|'buff'|'set'} additionType
 * @typedef { number
 *      | { type: additionType, value: addition, times?: number }
 *      | ({uuid: string}) => addition
 * } addition
 */
import { crank } from './functions.js';
export default class Score {
    constructor(users) {
        for(const uuid of users) {
            this.#map.set(uuid, 0);
        }
    }
    /** @private @type {Map<string, number>} */
    #map = new Map();
    /** @private @type {Map<string, [times: number, buff: number][]>} */
    #buff = new Map();
    #rankings = new Map();

    /** @readonly 分数map */
    get map() {return new Map(this.#map);}

    rankit() {
        let lastRank = 1;
        this.crank().forEach(row=>{
            row.forEach(
                uuid=>this.#rankings.set(uuid, lastRank)
            );
            lastRank += row.length;
        });
    }

    ranking(uuid) {
        return this.#rankings.get(uuid);
    }

    crank() { return crank(this.#map); }

    /**
     * @param {string} uuid
     */
    get(uuid) {
        return this.#map.get(uuid)||0;
    }

    #fix(value) {
        value = Number(value).toFixed(2)
        return Number(value) || 0;
    }

    /**
     * 分数改变
     * @param {string} uuid
     * @param {number} value
     */
    #alert(uuid, value) {
        const last = this.get(uuid);
        const score = this.#fix(last + value);
        this.#map.set(uuid, score);
        return this.#fix(score - last);
    }

    /**
     * 直接设置分数
     * @param {string} uuid
     * @param {number} value
     */
    #set(uuid, value) {
        const last = this.get(uuid);
        const score = this.#fix(value);
        this.#map.set(uuid, score);
        return this.#fix(score - last);
    }

    /**
     * 存buff
     * @param {string} uuid
     * @param {number} value
     * @param {number} times
     * @returns {0}
     */
    #addbuff(uuid, value, times) {
        const buffs = this.#buff.get(uuid) || [];
        buffs.push([times, value]);
        this.#buff.set(uuid, buffs);
        return 0;
    }

    /**
     * 上buff
     * @param {string} uuid
     * @param {number} value
     * @returns {number}
     */
    #buffit(uuid, value) {
        if(!this.#buff.has(uuid))
            return value;
        const buffs = this.#buff
            .get(uuid)
            .map(([times, buff]) => {
                value *= buff;
                return [times -1, buff];
            })
            .filter(([times]) => times > 0);
        if(buffs.length > 0)
            this.#buff.set(uuid, buffs);
        else
            this.#buff.delete(uuid);
        return value;
    }

    /**
     * 转换加成
     * @param {string} uuid
     * @param {addition} addition
     * @returns {{
     *      type: additionType,
     *      value: number,
     *      times?: number,
     * }}
     */
    #convert(uuid, addition) {
        if(addition == null)
            return {type: 'value', value: 0};
        switch(typeof addition) {
            case 'number':
                return { type: 'value', value: addition || 0 };
            case 'function':
                return this.#convert(uuid, addition({uuid}));
            case 'object':
                if(addition.type && addition.type!='value')
                    return addition;
                return this.#convert(uuid, addition.value);
            default: break;
        }

        return {type: 'value', value: 0};
    }

    /**
     * 加成
     * @param {string} uuid
     * @param {addition} addition
     */
    addition(uuid, addition) {
        const {type, times, value} = this.#convert(uuid, addition);
        const alter = this.#buffit(uuid, value);
        switch(type) {
            case 'value':
                return this.#alert(uuid, alter);
            case 'buff':
                return this.#addbuff(uuid, value, times);
            case 'set':
                return this.#set(uuid, alter);
            default: return 0;
        }
    }

    least(uuid, least) {
        this.#buffit(uuid, 0);
        return this.#alert(uuid, least);
    }
}