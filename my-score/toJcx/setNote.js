/*
 * 转换note里的音符
 */
export default function note(n) {
  const {duration, value, tied} = n
  const res = duration.map(d => value + d).join('-')

  return (tied ? '-' : '') + res
}
