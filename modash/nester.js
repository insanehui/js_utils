/*
 * 把有嵌套工具的文本序列结构化
 * 看看在哪里结束比较好
 */
export default function _nester(_s, a = '(', b = ')' ) {
  let s = _s

  function nester() {
    const i = s.indexOf(a) 
    const j = s.indexOf(b)

    if ( i < j && i !== -1 ) { // 有嵌套
      const r1 = s.slice(0, i)
      s = s.slice(i+a.length)
      return [
        r1,
        nester(),
        ...nester(),
      ]
      
    } 

    // 没有嵌套情况
    if ( j === -1 ) { // 一路畅通
      const tmp = s
      s = ''
      return [tmp]
    } 
    else { // 有残留 )
      // 截取
      const res = [s.slice(0, j)]
      s = s.slice(j+b.length)
      return res
    }
  }

  return nester()
}
