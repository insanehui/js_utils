/*
 * 读取简短的header
 */
export default function headerInfo(a) {
  const pieces = a.split(/\s+/)
  return {
    ...(pieces[0] && {title : pieces[0]}),
  }
}
