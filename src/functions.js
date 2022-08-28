export function listRandom(list, cnt=null, rOthers = false) {
    if(cnt === null) return list[Math.floor(Math.random() * list.length)];
    const set = new Set(list);
    list = [...set];
    if(cnt >= list.length) return list;
    const picked = new Set();
    while(picked.size < cnt) {
        const val = list[Math.floor(Math.random() * list.length)];
        picked.add(val);
        if(rOthers) set.delete(val);
    }
    if(rOthers) return [[...picked], [...set]];
    return [...picked];
}

/**
 * 猜拳
 * 0: 石头
 * 2: 剪刀
 * 5: 布
 * @param {number|array} aList a的出拳列表
 * @param {number|array} bList b的出拳列表
 * @returns {number} 对局分数 a赢的次数 - b赢的次数
 * @example
 *      fingerGuessing(0, 2) // 1
 *      fingerGuessing(5, 2) // -1
 *      fingerGuessing(0, 0) // 0
 *      fingerGuessing([0,0,0], [2,2,2]) // 3
 *      fingerGuessing([0,2,5], [0,2,5]) // 0
 *      fingerGuessing([0,0,5], [0,2,2]) // 0
 *      fingerGuessing([2,5,5], [0,2,5]) // -2
 */
export function fingerGuessing(aList, bList) {
    const pk = (a,b) => {
        switch(`${a}${b}`) {
            case '02':
            case '25':
            case '50':
                return 1;
            case '20':
            case '52':
            case '05':
                return -1;
            default:
                return 0;
        }
    };

    if(typeof aList === 'number') aList = [aList];
    if(typeof bList === 'number') bList = [bList];
    let result = 0;
    let times = aList.length;
    while(times--) {
        result += pk(aList[times], bList[times]);
    }
    return result;
}

/**
 * 多重forEach循环
 * @param {array[]} lists 多个列表
 * @returns {function} 循环函数 接受一个callback
 * @example
 *      const listA = [1,2,3];
 *      const listB = [4,5];
 *      const listC = [6,8];
 *      multiForEach([listA, listB, listC])((a, b, c) => {
 *         console.log(a, b, c);
 *      });
 **     // 1 4 7
 **     // 1 4 8
 **     // 1 4 9
 **     // 1 5 7
 **     // 1 5 8
 **     // 1 5 9
 **     // 2 4 7
 **     // 2 4 8
 **     // 2 4 9
 **     // 2 5 7
 **     // 2 5 8
 **     // 2 5 9
 **     // 3 4 7
 **     // 3 4 8
 **     // 3 4 9
 **     // 3 5 7
 **     // 3 5 8
 **     // 3 5 9
 */
export function mutipleForEach(...lists) {
    const end = lists.length - 1;
    const deepForEach = (args, index, callback) => {
        if(index === end) {
            lists[index].forEach(data=>callback(...args, data));
            return;
        }
        lists[index].forEach(data=>{
            deepForEach([...args, data], index +1, callback);
        })
    };
    return callback => {
        if(!callback) return;
        if(lists.length === 0) return;
        deepForEach([], 0, callback);
    }
}

/**
 * 判断是否在区间内
 * @param {number} x 判断的数字
 * @param {number} a 区间的开始
 * @param {number} b 区间的结束
 * @param {boolean} andA 左闭
 * @param {boolean} andB 右闭
 * @returns {boolean} 是否在区间内
 * @example
 *      between(2, 1, 3) // true
 *      between(0, 1, 3) // false
 *      between(1, 1, 3) // true
 *      between(3, 1, 3) // true
 *      between(1, 1, 3, true) // true
 *      between(1, 1, 3, false) // false
 *      between(3, 1, 3, false) // true
 *      between(3, 1, 3, true, false) // false
 *      between(3, 1, 3, false, true) // true
 *      between(1, 1, 3, true, false) // true
 *      between(1, 1, 3, false, false) // false
 */
export function between(x, a, b, andA=true, andB=true) {
    return !(x < a || x > b || !andA && x == a || !andB && x == b);
}

export function sum(...args) {
    return args.flat().reduce((a, b) => a + b, 0);
}

export function crank(map) {
    const r = [];
    Array.from(map.entries())
        .sort(([_a, a], [_b, b])=>b-a)
        .forEach(([o, c], i, l)=>{
            if(!i)
                return r.push([o]);

            if(l[i-1][1] == c)
                r.at(-1).push(o);
            else
                r.push([o]);
        });
    return r;
}