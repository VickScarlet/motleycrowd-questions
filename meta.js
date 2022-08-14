
import { listRandom } from "./functions.js";
import * as q1001 from './q1001.js';

import * as q2001 from './q2001.js';
import * as q2002 from './q2002.js';
import * as q2003 from './q2003.js';
import * as q2004 from './q2004.js';
import * as q2005 from './q2005.js';
import * as q2006 from './q2006.js';
import * as q2007 from './q2007.js';
import * as q2008 from './q2008.js';

import * as q3001 from './q3001.js';
import * as q3002 from './q3002.js';
import * as q3003 from './q3003.js';
import * as q3004 from './q3004.js';
import * as q3005 from './q3005.js';
import * as q3006 from './q3006.js';

import * as q4001 from './q4001.js';
import * as q4002 from './q4002.js';
import * as q4003 from './q4003.js';
import * as q4004 from './q4004.js';
import * as q4005 from './q4005.js';
import * as q4006 from './q4006.js';
import * as q4007 from './q4007.js';
import * as q4008 from './q4008.js';

import * as q5001 from './q5001.js';
import * as q5002 from './q5002.js';
import * as q5003 from './q5003.js';
import * as q5004 from './q5004.js';
import * as q5005 from './q5005.js';
import * as q5006 from './q5006.js';
import * as q5007 from './q5007.js';
import * as q5008 from './q5008.js';

import * as q6001 from './q6001.js';
import * as q6002 from './q6002.js';
import * as q6003 from './q6003.js';
import * as q6004 from './q6004.js';

import * as q7001 from './q7001.js';

const metas = {
    q1001,
    q2001, q2002, q2003, q2004, q2005, q2006, q2007, q2008,
    q3001, q3002, q3003, q3004, q3005, q3006,
    q4001, q4002, q4003, q4004, q4005, q4006, q4007, q4008,
    q5001, q5002, q5003, q5004, q5005, q5006, q5007, q5008,
    q6001, q6002, q6003, q6004,
    q7001,
};

export const pool = new Map();

pool.set(10, [
    ['q1001'],
    ['q2001', 'q2002', 'q2003', 'q2004', 'q2005', 'q2006', 'q2007', 'q2008'],
    ['q3001', 'q3002', 'q3003', 'q3004', 'q3005', 'q3006'],
    ['q4001', 'q4002', 'q4003', 'q4004', 'q4005', 'q4006', 'q4007', 'q4008'],
    ['q5001', 'q5002', 'q5003', 'q5004', 'q5005', 'q5006', 'q5007', 'q5008'],
    ['q6001', 'q6002', 'q6003', 'q6004'],
    ['q7001'],
]);

pool.set(100, [
    ['q1001'],
    ['q2001', 'q2002', 'q2003', 'q2004', 'q2005', 'q2006', 'q2007', 'q2008'],
    ['q3001', 'q3002', 'q3003', 'q3004', 'q3005', 'q3006'],
    ['q4001', 'q4002', 'q4003', 'q4004', 'q4005', 'q4006', 'q4007', 'q4008'],
    ['q5001', 'q5002', 'q5003', 'q5004', 'q5005', 'q5006', 'q5007', 'q5008'],
    ['q6001', 'q6002', 'q6003', 'q6004'],
    ['q7001'],
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
