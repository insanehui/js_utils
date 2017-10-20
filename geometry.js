/*
 * 一些几何相关的库
 * 包括拓扑几何的一些算法，也暂时放到这里
 */
import _ from 'lodash'
import {firstor} from './modash.js'

const _bound_rect = points => { 
  /*
   * points为[ {x, y} ]
   */
  const [{x:x0,y:y0}, ...rest] = points
  let rect = {
    left : x0,
    top : y0,
    right : x0,
    bottom : y0,
  }

  _.each(rest, ({x, y}) => {
    const {left, right, top, bottom} = rect
    if ( x > right ) {
      rect.right = x
    } 
    else if ( x < left ) {
      rect.left = x
    } 

    if ( y > bottom ) {
      rect.bottom = y
    } 
    else if ( y < top ) {
      rect.top = y
    } 
  })

  const {left, right, top, bottom} = rect
  rect.x = left
  rect.y = top
  rect.width = right - left
  rect.height = bottom - top
  return rect
}

export const bound_rect = (first, ...rest) => { // 求一系列点的外包矩形（可压线）
  if ( !_.isArray(first) ) {
    return _bound_rect([first, ...rest])
  } 

  return _bound_rect(first)
}

export const point_in_rect = (point, rect) => { // 判断一个点是否在矩形里（可压线）
  /*
   * rect支持两种格式，如果缺少必要字段，将会推算出来
   */

  const {x, y, left=x, top=y, width, height, right=left+width, bottom=top+height} = rect
  const {x:px, y:py} = point

  if ( px >= left && px <= right && py >= top && py <= bottom  ) {
    return true
  } 
  return false

}

// 将边数据结构转成树数据结构
export function links2tree(links){
  /*
   * 最终返回的树结构为
   * {
   *  key: 全局唯一
   *  children : [
   *    {
   *      key:
   *    },
   *  ]
   * }
   */
  let map = {}

  function get(key) {
    if ( !map[key] ) {
      map[key] = {key, children:[]}
    } 
    return map[key]
  }

  const keys = {} // 用来找到"头"
  for (const [from, to] of links) {
    keys[from] = keys[to] = 1
  }

  for(const key in links) {
    const [from, to] = links[key]
    get(to).children.push(get(from)) // 搭建树结构
    delete keys[from]
  }

  let root = _.keys(keys)
  if ( root.length !== 1 ) {
    console.log('roots', root)
    let err = 'links does not form a tree'
    throw err
  } 

  return get(root[0])
}

// 根据树结构以及一些配置（待定），自动计算出每个结点的坐标（纯算法）
export function tree_layout(tree, opt = {}) {
  /*
   * tree的格式为：
   * {
   *  key: 全局唯一
   *  children : []
   * }
   */

  // 先深克隆一份
  tree = _.cloneDeep(tree)

  opt = _.defaults(opt, {x_gap : 120, y_gap : 160})
  const {x_gap, y_gap} = opt

  /*
   * 这里先考虑每个节点本身是没有大小的（对于节点本身有形状大小的场景似乎可以转化为没有大小的情况）
   */


  function relative_layout(head) { // 递归求相对坐标
    /*
     * 最终会注入的布局数据如下：
     * width, height: 整个外包矩形的尺寸
     * lx, ly: 头节点在外包矩形里的坐标
     * dx, dy: 其作为子节点，在外层里的编移
     */

    const {children} = head
    head.dx = head.dy = 0 // dx, dy的初始化

    if ( !children.length ) { // 如果没有子节点，直接以最简单的形式返回
      head.width = head.height = 0
      head.lx = head.ly = 0
      return
    } 

    // 对于有子节点的情况，先递归布局子节点
    for (const child of children) {
      relative_layout(child)
    }

    // 这时子节点都已有了一部分坐标数据
    let cw = 0, ch = 0  // 用来统计孩子部分的尺寸
    const first = firstor()

    for (const child of children) {
      const {width, height} = child

      child.dy = y_gap // 每个孩子的dy固定为全局的DY

      const step = first() ? 0 : x_gap
      cw += step
      child.dx = cw

      cw += width
      ch = Math.max(ch, height)
    }

    // 要根据这两个值来计算head的坐标
    const first_child = _.first(children)
    const last_child = _.last(children)
    const padding_left = first_child.lx
    const padding_right = last_child.width - last_child.lx
    const heads_width = cw - padding_left - padding_right


    // 得到自己的坐标信息
    head.width = cw
    head.height = ch + y_gap
    // head.lx = cw / 2 // 这是取盒子中点的方法
    // 更好的是取子节点头部的中点
    head.lx = padding_left + heads_width/2
    head.ly = 0
  }
  relative_layout(tree)

  function global_layout(head, ctx = {dx:0, dy:0}) { // 在相对坐标已知的基础上，递归求得绝对坐标
    /*
     * 最终会注入gx, gy
     */
    const {dx:cdx, dy:cdy} = ctx
    const {children, lx, ly} = head
    let {dx, dy} = head
    dx += cdx
    dy += cdy
    head.gx = lx + dx
    head.gy = ly + dy

    // 递归处理子节点
    for (const child of children) {
      global_layout(child, {dx, dy})
    }
  }
  global_layout(tree)

  return tree
}

// 先序遍历树结构的算法
export function pre_traverse(tree, fn){
  /*
   * fn(child)
   */

  function traverse(head) { // 递归函数
    const {children} = head
    fn(head)
    for (const child of children) {
      traverse(child)
    }
  }

  traverse(tree)
}

