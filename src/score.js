import { crank } from './functions.js';
export default class Score {
    constructor(users) {
        for(const uuid of users) {
            this.#map.set(uuid, 0);
        }
    }
    #map = new Map();
    #buff = new Map();

    get map() {return new Map(this.#map);}

    crank() { return crank(this.#map); }

    get(uuid) {
        return this.#map.get(uuid)||0;
    }

    #alert(uuid, value) {
        const last = this.#map.get(uuid) || 0;
        const score = Number((last + value || 0).toFixed(2));
        this.#map.set(uuid, score);
        return Number((score - last).toFixed(2));
    }

    #set(uuid, value) {
        const last = this.#map.get(uuid) || 0;
        const score = Number((value || 0).toFixed(2));
        this.#map.set(uuid, score);
        return Number((score - last).toFixed(2));
    }

    #addbuff(uuid, value, times) {
        const buffs = this.#buff.get(uuid) || [];
        buffs.push([times, value]);
        this.#buff.set(uuid, buffs);
        return 0;
    }

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
        }

        return {type: 'value', value: 0};
    }

    addition(uuid, addition) {
        const {type, times, value} = this.#convert(uuid, addition);
        const alter = this.#buffit(uuid, value);
        let score = 0;
        switch(type) {
            case 'value':
                score = this.#alert(uuid, alter);
                break;
            case 'buff':
                this.#addbuff(uuid, value, times);
                break;
            case 'set':
                score = this.#set(uuid, alter);
                break;
        }
        return score;
    }

    least(uuid, least) {
        this.#buffit(uuid, 0);
        return this.#alert(uuid, least);
    }
}