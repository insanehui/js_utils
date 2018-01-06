// React
/*
 * 一个用来调整数值的算法，仅对整数使用
 * 示例:
  function check(i) {
    return i-8
  }

  (async ()=>{
    const r = await adjust(check, 99999)
    console.log('value', r)
  })()
*/
export async function adjust(check, {returnCheck = false, v = 0}){
  /*
   * todo: round 还可以取值 ceil
   * returnCheck选项意思是，在返回之前，再check一次v（Ellipsis组件就依赖了该选项）
   * const n = await check(v) n可以为0或者正数、负数，表示偏差
   */
  let res

  let state = 'unkown' , a = null, b = null, delta = 1
  while(1) {
    res = await check(v) // 求一次值

    if ( state === 'unkown' ) { // 初始状态
      if ( res === 0 ) {
        return v // 找到目标值，直接返回
      } 
      else if(res < 0){
        state = 'below'
        a = v
      }
      else if ( res > 0 ) {
        state = 'above'
        b = v
      } 
    } 

    if ( state === 'below' ) {
      if ( b !== null ) { // 如果已经有范围，则取一半
        v = ~~((a + b)/2)
        if ( v === a ) { 
          returnCheck && await check(v)
          return v 
        } 
      } 
      else {
        delta *= 2
        v += delta
      } 
      state = 'unkown'
    } 
    else if ( state === 'above' ) {
      if ( a !== null ) {
        v = ~~((a + b)/2)
        if ( v === a ) { 
          returnCheck && await check(v)
          return v 
        } 
      } 
      else {
        delta *= 2
        v -= delta
      }
      state = 'unkown'
    } 
  }
}

