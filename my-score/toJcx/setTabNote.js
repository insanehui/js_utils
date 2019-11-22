/*
 * 转换note里的音符
 */
export default function note(n) {
  const {duration, value, tied} = n
  const res = duration.map(d => {
    if ( d && !d.startsWith('/') ) {
      d = '*' + d
    } 
    return value + d
  }).join('-')

  return (tied ? '-' : '') + res
}
