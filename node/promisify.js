/*
 * 增加一些经过promisify的原生库函数
 * TODO: 后续如果这里的函数多了，再按包名进行区分
 */
const util = require('util');
const cp = require('child_process')

export const exec = util.promisify(cp.exec);
