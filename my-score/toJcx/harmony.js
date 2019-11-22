/*
 * 转换普通harmony里的音符
 */
export default function harmony(h) {
  const {duration, value, tied} = h
  let res = duration.map(d => {
    return '[' + value.map(v => v.value + d).join('') + ']'
  }).join('-')
  return (tied ? '-' : '') + res
}
