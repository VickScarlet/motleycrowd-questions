
import { listRandom } from "./functions.js";
import * as q1001 from './q1001.js';
import * as qs1001 from './qs1001.js';

import * as q2001 from './q2001.js';
import * as q2002 from './q2002.js';
import * as q2003 from './q2003.js';
import * as q2004 from './q2004.js';
import * as q2005 from './q2005.js';
import * as q2006 from './q2006.js';
import * as q2007 from './q2007.js';
import * as q2008 from './q2008.js';
import * as qs2001 from './qs2001.js';
import * as qs2002 from './qs2002.js';
import * as qs2003 from './qs2003.js';
import * as qs2004 from './qs2004.js';
import * as qs2005 from './qs2005.js';
import * as qs2006 from './qs2006.js';
import * as qs2007 from './qs2007.js';
import * as qs2008 from './qs2008.js';

import * as q3001 from './q3001.js';
import * as q3002 from './q3002.js';
import * as q3003 from './q3003.js';
import * as q3004 from './q3004.js';
import * as q3005 from './q3005.js';
import * as q3006 from './q3006.js';
import * as qs3001 from './qs3001.js';
import * as qs3002 from './qs3002.js';
import * as qs3003 from './qs3003.js';
import * as qs3004 from './qs3004.js';
import * as qs3005 from './qs3005.js';
import * as qs3006 from './qs3006.js';

import * as q4001 from './q4001.js';
import * as q4002 from './q4002.js';
import * as q4003 from './q4003.js';
import * as q4004 from './q4004.js';
import * as q4005 from './q4005.js';
import * as q4006 from './q4006.js';
import * as q4007 from './q4007.js';
import * as q4008 from './q4008.js';
import * as qs4001 from './qs4001.js';
import * as qs4002 from './qs4002.js';
import * as qs4003 from './qs4003.js';
import * as qs4004 from './qs4004.js';
import * as qs4005 from './qs4005.js';
import * as qs4006 from './qs4006.js';
import * as qs4007 from './qs4007.js';
import * as qs4008 from './qs4008.js';

import * as q5001 from './q5001.js';
import * as q5002 from './q5002.js';
import * as q5003 from './q5003.js';
import * as q5004 from './q5004.js';
import * as q5005 from './q5005.js';
import * as q5006 from './q5006.js';
import * as q5007 from './q5007.js';
import * as q5008 from './q5008.js';
import * as qs5001 from './qs5001.js';
import * as qs5002 from './qs5002.js';
import * as qs5003 from './qs5003.js';
import * as qs5004 from './qs5004.js';
import * as qs5005 from './qs5005.js';
import * as qs5006 from './qs5006.js';
import * as qs5007 from './qs5007.js';

import * as q6001 from './q6001.js';
import * as q6002 from './q6002.js';
import * as q6003 from './q6003.js';
import * as q6004 from './q6004.js';
import * as qs6001 from './qs6001.js';
import * as qs6002 from './qs6002.js';
import * as qs6003 from './qs6003.js';
import * as qs6004 from './qs6004.js';

import * as q7001 from './q7001.js';
import * as qs7001 from './qs7001.js';



const metas = {
    q1001,
    q2001, q2002, q2003, q2004, q2005, q2006, q2007, q2008,
    q3001, q3002, q3003, q3004, q3005, q3006,
    q4001, q4002, q4003, q4004, q4005, q4006, q4007, q4008,
    q5001, q5002, q5003, q5004, q5005, q5006, q5007, q5008,
    q6001, q6002, q6003, q6004,
    q7001,

    qs1001,
    qs2001, qs2002, qs2003, qs2004, qs2005, qs2006, qs2007, qs2008,
    qs3001, qs3002, qs3003, qs3004, qs3005, qs3006,
    qs4001, qs4002, qs4003, qs4004, qs4005, qs4006, qs4007, qs4008,
    qs5001, qs5002, qs5003, qs5004, qs5005, qs5006, qs5007,
    qs6001, qs6002, qs6003, qs6004,
    qs7001,
};

export const pool = new Map();

pool.set(10, [
    ['qs1001'],
    ['qs2001', 'qs2002', 'qs2003', 'qs2004', 'qs2005', 'qs2006', 'qs2007', 'qs2008'],
    ['qs3001', 'qs3002', 'qs3003', 'qs3004', 'qs3005', 'qs3006'],
    ['qs4001', 'qs4002', 'qs4003', 'qs4004', 'qs4005', 'qs4006', 'qs4007', 'qs4008'],
    ['qs5001', 'qs5002', 'qs5003', 'qs5004', 'qs5005', 'qs5006', 'qs5007'],
    ['qs6001', 'qs6002', 'qs6003', 'qs6004'],
    ['qs7001'],
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
