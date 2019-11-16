/*
 * 把有嵌套工具的文本序列结构化
 * 看看在哪里结束比较好
 */
export default function _nester(_s, a = '(', b = ')', name = '') {
  let s = _s

  function nester() {
    const i = s.indexOf(a) 
    const j = s.indexOf(b)

    let res

    if ( i < j && i !== -1 ) { // 有嵌套
      const r1 = s.slice(0, i)
      s = s.slice(i+a.length)
      const sub = nester()
      if ( name ) {
        sub.nesterName = name
      } 
      res = [
        r1,
        sub,
        ...nester(),
      ]
    } else if ( j === -1 ) { // 一路畅通
      const tmp = s
      s = ''
      res = [tmp] // 只有这种情况才注入name
    } 
    else { // 有残留 )
      // 截取
      res = [s.slice(0, j)]
      s = s.slice(j+b.length)
    }


    return res
  }

  return nester()
}
