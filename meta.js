
import { listRandom } from "./functions.js";
import * as q1001 from './q1001.js';
import * as q1002 from './q1002.js';
import * as q1003 from './q1003.js';
import * as q1004 from './q1004.js';
import * as q1005 from './q1005.js';

const metas = {
    q1001, q1002, q1003, q1004, q1005,
};

export const pool = new Map();

pool.set(10, [
    ['q1001'],
    ['q1002'],
    ['q1003'],
    ['q1004'],
    ['q1005'],
]);

pool.set(100, [
    ['q1001'],
    ['q1002'],
    ['q1003'],
    ['q1004'],
    ['q1005'],
]);

export function meta(id) {
    const data = {id};
    const question = metas[id];
    for(const key in question)
        data[key] = question[key];
    return data;
}

export function pick(tag) {
    const p = pool.get(tag);
    if(!p) return null;
    return p.map(list=>meta(listRandom(list)));
}
