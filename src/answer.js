import { crank } from './functions.js';
export default class Answer {
    constructor({options}) {
        this.#options = new Set([...options]);
        this.#options.forEach(opt=>{
            this.#counter.set(opt, 0);
        });
    }
    #options;
    #map = new Map();
    #counter = new Map();

    get size() { return this.#map.size; }
    get counter() { return new Map(this.#counter); }
    get map() {return new Map(this.#map);}

    answer(uuid, answer) {
        if(this.#map.has(uuid) || !this.#options.has(answer))
            return false;
        this.#map.set(uuid, answer);
        this.#counter.set(answer, this.count(answer)+1);
        return true;
    }

    has(uuid) {
        return this.#map.has(uuid);
    }

    get(uuid) {
        return this.#map.get(uuid);
    }

    count(answer) {return this.#counter.get(answer) || 0;}

    most(answer, only=false) {
        const count = this.count(answer);

        for(const [a, c] of this.#counter) {
            if(a == answer) continue;
            if( c>count || only && c==count)
                return false;
        }
        return true;
    }

    least(answer, only=false) {
        const count = this.count(answer);

        for(const [a, c] of this.#counter) {
            if(a == answer) continue;
            if( c<count || only && c==count)
                return false;
        }
        return true;
    }

    same(answer) {
        const count = this.count(answer);
        let same = 0;

        this.#counter.forEach(option =>{
            if(this.count(option) == count)
                same ++;
        });
        return same;
    }

    maxsame() {
        const map = {};
        this.#options.forEach(option =>{
            const count = this.count(option)
            map[count] = (map[count] || 0) + 1;
        });
        return Math.max(...Object.values(map));
    }

    crank() { return crank(this.#counter); }
}