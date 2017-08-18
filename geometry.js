/*
 * 一些几何相关的库
 */
import _ from 'lodash'

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
