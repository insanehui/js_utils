/*
 * 单纯地提升一个函数的阶
 */
export default function lift(fn, by = 1) {
  if ( by === 0 ) {
    return fn
  } 
  const high = (...p)=>()=>fn(...p)
  return lift(high, by-1)
}

