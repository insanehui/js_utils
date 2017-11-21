/* 对lodash的一些补充 */
import _ from 'lodash'

function str_for_testify(v){ // 如果是对象，则用json，否则用其原来的形式
  if ( _.isObject(v) ) {
    return JSON.stringify(v, null, '  ')
  } 
  if ( _.isString(v) ) {
    return `\`${v.replace(/`/g, '\\`')}\``
  } 
  return v
}

function _ungroup(o, keys, p){ // ungroup的递归主体
  // 这是一个递归函数，之前在cdb团队写过c++版的json_ungroup，后来代码遗失，今天重新梳理 2016年12月21日
  // 这里o是一个对象，keys为还剩下需要ungroup的序列，为数组，p为已经积累的需要合并的数据

  if ( !_.isObject(o) ) {
    return [] // 始终返回为一个数组，行为统一，便于递归
  }

  // 已经结束
  if ( !_.size(keys) ) {
    return [{...o, ...p}] 
  } 

  // 进入递归
  // 取出keys第一个元素
  const [key, ...rest] = keys
  let arr = []
  _.each(o, (v, k ) => {
    arr = [...arr, ..._ungroup(v, rest, {...p, [key]:k})]
  })

  return arr
}

/*
 * path是个数组
 */
function _iset_(data, path, value){ // iset的预备函数，递归
  const [first, ...rest] = path
  const first_val = _.get(data, [first]) 
  if ( rest.length === 0 ) { // 如果只有一级
    if ( first_val === value ) { // 如果和当前的值相等
      return data // 将原值返回
    } 
    else {
      return {
        ...data,
        [first] : value,
      }
    }
  } 

  // 进入递归
  const sub = _iset_(first_val, rest, value)
  return {
    ...data,
    [first] : sub,
  }
}

/*
 * [注：_.merge似乎也能解决大部分需求，不一定需要用上本函数]
 */
export function iset(data, path, value){  // 具有immutable性质的set，用法类似_.set
  if ( _.isString(path) ) {
    path = path.split('.')
  } 
  return _iset_(data, path, value)
}

// 经典ungroup
export function ungroup(o, ...keys){
  return _ungroup(o, keys, {})
}

// 经典group
export function group(o, [...by], {...opt}){
  let ret = {}

  const {strip, array} = opt // 缺省不strip，并且保留obj形式
  _.each(o, item => { // 遍历数据集
    let cursor = ret // 游标指针

    _.each(by, (key, i) => { // 遍历by
      let val = item[key] // 取到item的值
      if ( i < by.length - 1 ) { // 如果还没到达叶子
        // 移动指针. TODO: 后面把这里闭包化

        if ( !(val in cursor ) ) {
          cursor[val] = {}
        } 
        cursor = cursor[val]
      } else { // 已经到了叶子，直接赋值
        const leaf = strip ? _.omit(item, by) : item
        cursor[val] = array ? [ ...(cursor[val] || []), leaf ] : leaf
      }
    })
  })
  return ret
}

// 从一个集合中取任意一个元素，也可以当onlyone使用
export const anyone = c => {
  let ret
  for(const key in c) {
    ret = c[key]
    return ret
  }
  return ret
}

function _traverse(obj, fn, depth, pre){ // 递归主体. 深度遍历一个对象，可以指定深度级别
  /*
   * obj: 为当前的对象，而非根对象。目的一是提高效率，二是体现更纯粹的递归思想
   * depth表示还要进入的深度，0表示结束递归，利用这一点，填负数（如-1）可以进行完全深度遍历！
   * fn(val, [...path])
   * pre表示前辈已经走了的路径, 如['a', 'b']
   */

  if ( depth === 0 || !_.isObject(obj) ) { // 已不需要再深入或者无法再深入，结束递归
    fn(obj, pre)
    return
  } 

  // 递归深入
  for( const key in obj )
  {
    _traverse(obj[key], fn, depth-1, [...pre, key])
  }

}

export function traverse(obj, fn, depth = 1){
  _traverse(obj, fn, depth, [])
}

function _traverse_any(obj, fn, depth, pre){ // [递归主体] _.some的深度traverse版
  /*
   * 其他参数同 _traverse
   * fn(val, [...path]) => bool
   */

  if ( depth === 0 || !_.isObject(obj) ) { // 已不需要再深入或者无法再深入，结束递归
    return !!fn(obj, pre)
  } 

  // 递归深入
  for( const key in obj )
  {
    const ret = _traverse_any(obj[key], fn, depth-1, [...pre, key])
    if ( ret ) {
      return true
    } 
  }

  return false

}

export function traverse_any(obj, fn, depth = 1){
  return _traverse_any(obj, fn, depth, [])
}

function _traverse_all(obj, fn, depth, pre){ // [递归主体] _.some的深度traverse版
  /*
   * 其他参数同 _traverse
   * fn(val, [...path]) => bool
   */

  if ( depth === 0 || !_.isObject(obj) ) { // 已不需要再深入或者无法再深入，结束递归
    return !!fn(obj, pre)
  } 

  // 递归深入
  for( const key in obj )
  {
    const ret = _traverse_all(obj[key], fn, depth-1, [...pre, key])
    if ( !ret ) {
      return false
    } 
  }

  return true

}

export function traverse_all(obj, fn, depth = 1){

  if ( _.isString(fn) ) {
    fn = _.property(fn)
  } 

  return _traverse_all(obj, fn, depth, [])
}

export function test(){
  console.log('test!!', [1, ...null])
}

export function test_ungroup(){
  // 原始数据
  const from = {
    a : {
      a1 : { 
        val : 1 
      }, 
      a2 : { 
        val : 2,
      }, 
    },
    b : {
      b1 : { 
        val : 3,
      }, 
      b2 : { 
        val : 4,
      }, 
    },
  }

  // 最终期望替换成
  const to = [
      { 
        key1: 'a',
        key2: 'a1',
        val : 1,
      }, 
      { 
        key1: 'a',
        key2: 'a2',
        val : 2,
      }, 
      { 
        key1: 'b',
        key2: 'b1',
        val : 3,
      }, 
      { 
        key1: 'b',
        key2: 'b2',
        val : 4,
      }, 
  ]

  const r = ungroup(from, 'key1', 'key2')
  console.log(_.isEqual(r, to) )

}

// 对lodash的compact的一个封装，令其支持对象
export const compact = val => {
  if ( _.isArray(val) ) {
    return _.compact(val)
  } 
  if ( _.isObject(val) ) {
    return _.pickBy(val, x=>x)
  } 
  return val  
}

// 将arr以值为分割，截成2段，返回新数组，形如：[ before, after ]，不包括v
function arrCut(arr, v) { 
  const i = _.indexOf(arr, v)
  if ( i === -1 ) {
    return null
  } 

  const before = _.slice(arr, 0, i)
  const after = _.slice(arr, i+1)
  return [before, after]
}

// 字符串的显示长度
export function str_display_len(str){
  let l = 0 // 返回的长度
  for (let c of str) {
    l += c.codePointAt(0) > 256 ? 2 : 1
  }
  return l
}

// 将字符串以显示的长度分割，非英文占两个长度，最终长度可能会超出1个单位
export function str_display_cut(str, len){
  let r = ''
  let l = 0 // 当前的长度
  for (let c of str) {
    r += c
    l += c.codePointAt(0) > 256 ? 2 : 1
    if ( l >= len ) {
      break
    } 
    // console.log(c);
  }
  return r
}

// 类似str_display_cut，但会根据情况增加省略号
export function str_ellipsis(str, len, postfix = '…'){
  if ( str_display_len(str) <= len ) {
    return str
  } 

  return str_display_cut(str, len - str_display_len(postfix)) + postfix
}

export function test_arrCut(){
  const t = [ 2, 8, 3, 9, 7, 0, 5, 6 ]
  console.log("cut: ", arrCut(t, 9))
}

const begin = console.groupCollapsed ? console.groupCollapsed.bind(console) : console.log.bind(console)
const end = console.groupEnd ? console.groupEnd.bind(console) : _.noop

export function logify(func){ // 令一个函数可以打参数和返回日志的高阶函数

  return (...para) => {
    begin(`=== ${func.name} called ===`)
    console.log("arguments: ", para)
    const ret = func(...para)
    console.log("return: ", ret)
    end()
    return ret
  }
}

export function testify(func){

  return (...para) => {
    begin(`=== ${func.name} called ===`)
    const ret = func(...para)
    console.log(`
it('${func.name}', () => {
  const para = ${str_for_testify(para)}
  const hope = ${str_for_testify(ret)}
  const fact = ${func.name}(...para)
  expect(fact).toEqual(hope)
})
    `)
    end()
    return ret
  }
}

export const timify = (func, name)=>(...para)=>{
  begin(`... ${name || func.name} ...`)
  const time = Date.now()
  const ret = func(...para)
  console.log("time: ", Date.now()-time)
  end()
  return ret
}

export function local_uid(){ // 返回字符串。唯一性只对当前页面有效
  // 暂时没用到，用到时，再弄了
}

/*
 * 将一个对象清洗成纯对象数据（类似于POD），没有复杂的继承链，没有方法。目前的策略是利用JSON来洗
 * 常用的一个场景是用来净化freezer里的数据
 * 也可用来深拷贝一个对象，虽然效率不高
 */
export function wash(obj){
  if ( !_.isObject(obj) ) {
    return obj
  } 
  return JSON.parse(JSON.stringify(obj)) 
}

// 对回调形式的func进行promise化
export const promisify = func => (...para) => new Promise((resolve, reject) => {
  /*
  * func的格式为：func(ok_cb, err_cb, ...para)
  * 对于不符合这种格式的异步函数，可以人肉改写成这种形式，比如经典的setTimeout
  * const _timeout = (done, fail, ...para) => window.setTimeout(done, ...para) // 改成func要求的格式
  * const timeout = promisify(_timeout) // 这个时候即可进行promisify
  */
  func(resolve, reject, ...para)
})

// promise 形式的timeout
export const ptimeout = promisify((done, fail, ...para) => setTimeout(done, ...para))

export function numberfirst(v){ // 优先转为数字
  if ( _.isNaN( v-0 ) ) {
    return v
  } 
  return v-0
}

export function partial_order(pairs){ // 根据关系对，得到偏序的一个顺序
  /*
   * 顺序规则约定：pairs里的顺序与最终输出的排序一致。即如果pairs为[[a, b], [b, c]]，则输出为[a, b, c]
   *
   * > 术语：
   * 依赖：如果[a, b]出现在pairs中，则称a为b的依赖
   * 依赖序：对于一个a，求得一序列s（形如[x1, .., xn, a]），其中[x1, ..., xn]为a所有依赖的集合，并且按偏序排列，这时称s为a的一个依赖序
   *  注：给定一个a，其依赖序不一定唯一
   */
  let res = [] // 最终的结果

  /*
   * [依赖序加入] 指以下函数做的事情，即，将一个a的依赖序，加入到已有的res序列中去
   */
  // 递归
  function partial_one(item) { 

    if ( _.includes(res, item) ) { // 说明它已经输出过了，直接返回
      return res
    } 

    for (const pair of pairs) {
      if ( item === pair[1] ) { // 找到其中一个依赖
        partial_one(pair[0]) 
      } 
    }

    res = [...res, item]
  }

  for (const pair of pairs) {
    partial_one(pair[1])
    // console.log('---->', pair, JSON.stringify(res))
  }

  // console.log("res", res)
  return res
}

// 根据关系对，判断a能否到达b
export function graph_reachable(from, to, links) { // 递归
  /*
   * links结构同partial_order里的pairs
   * 由于该函数针对的是更广义的图，并不局限于偏序关系，因此换一个参数名字
   */
  const marks = new Set([from]) // 用来记录已经到过哪里，避免环路

  function loop(a, b) { 
    for (const pair of links) {
      // 找到以a为起点的地方
      if ( a !== pair[0] ) { 
        continue
      } 

      const next = pair[1]
      if ( next === b ) { // 找到终点
        return true // 返回结果
      } 
      else if ( marks.has(next) ) { // 如果已经在有了，说明有环路，不再进入环路
        // console.log('found loop')
        continue
      } else {
        marks.add(next) // 加到路标里
        if ( loop(next, b) ) { // 否则看看next能否到达
          return true
        } 
      }
    }
    return false
  }

  return loop(from, to)
}

// 根据关系对，比较两个元素
export function partial_compare(a, b, pairs){
  /*
   * 如果存在路径a->b，则认为a<b，返回-1，相等返回0，大于返回1，无法比较返回null
   */
  if ( a === b ) {
    return 0
  } 

  // 判断能否 a->b
  if ( graph_reachable(a, b, pairs) ) {
    return -1
  } 

  // 再判断能否 b->a
  if ( graph_reachable(b, a, pairs) ) {
    return 1
  } 

  return null
}

export function fromjson(j){ // JSON.parse的不抛异常版
  let ret
  try {
    ret = JSON.parse(j)
  } catch(e) {}
  return ret
}

export function tostr(v){ // 如果是对象（包括数组），则json化，否则直接取string形式
  if ( _.isObject(v) ) {
    return JSON.stringify(v, null, '  ')
  } 
  return v + ''
}

// 令事件处理函数的event stopPropagation
export const eclose = (fn = ()=>{} , n) => (...para) =>{
  /*
   * 这里的大坑是：react的测试模式和生产模式的事件机制不一样！测试模式有一个代理对象
   * 而生产模式则没有该对象，因此不能依赖这些潜在的机制
   */ 
  if ( !n) {
    n = fn.length
  } 
  const e = para[n]

  e.stopPropagation()
  return fn(...para)
}

// eclose的装饰器版
export const estop = (a1, name, d) => {
  const {value:fn} = d
  d.value = (...para) => {
    const n = fn.length
    const e = para[n]
    if ( _.hasIn(e, 'stopPropagation') ) {
      e.stopPropagation()
    } 
    else {
      console.warn(`no stopPropagation for ${name}`)
    }
    return fn(...para)
  }
}

/*
 * 将一个高阶函数转成方法的修饰器（类的修饰器不需要转）
 */
export const decorative = fn => (t, n, d) => {
  const {value} = d
  d.value = fn(value)
}

// 构造一个函数，第一次调用返回true，之后都返回false
export const firstor = ()=>{
  let ret = 1
  return ()=>{
    if ( ret ) {
      ret = 0
      return true
    } 
    return false
  }
}

