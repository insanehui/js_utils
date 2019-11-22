/*
 * 转换tab harmony里的音符
 */
export default function tabHarmony(h) {
  const {duration, value, tied, stroke} = h
  let res = duration.map(d => {
    if ( d && !d.startsWith('/') ) {
      d = '*' + d
    } 
    return '[' + value.map(v => v.value + d).join('') + ']'
  }).join('-')

  if ( stroke ) {
    res = {
      '^':'V',
      'v':'U',
    }[stroke] + res
  } 

  return (tied ? '-' : '') + res
}
