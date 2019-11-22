/*
 * 根据parse music的结果生成jcx的header
 */
export default function makeHeader(obj) {
  let res = ''
  /*
   * 由于jcx要求头部要有顺序，所以用数组作数据结构
   */
  let {header} = obj
  let {timeSign, beat} = header

  // 处理缺省值
  if (!beat)  { // 如果没有节拍，根据timeSign来生成
    beat = '1' + (timeSign ? timeSign.slice(1) : '/4')
    header = {
      ...header,
      beat,
    }
  } 
  if ( !header.key ) {
    header.key = 'C'
  } 

  const table = [
    ['title', 'T'], // 出现在谱面正上方
    ['info', 'I'],  // 出现在谱面左上角
    ['timeSign', 'M'],
    ['beat','L'], // 单位长度是多少
    ['tempo','Q'],
    ['artist','C'], // 谱面右上角
    ['key','K'],
  ]
  for (const [name, key] of table) {
    let values = header[name]
    if ( !values ) {
      continue
    } 
    if ( !Array.isArray(values) ) {
      values = [values]
    } 
    for (const v of values) {
      res += `${key}: ${v}\n`
    }
  }
  return res
}

