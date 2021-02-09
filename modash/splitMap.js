/*
 * 一个类似string.split的map，区别在于分隔符是正则表达式reg
 * head表示reg匹配后的字符串，tail表示从head后到下一个分隔符的内容
 * fn(head, tail)
 * 因此如果原始串不是以匹配的分隔符开头的话，最前面一截内容将被丢弃
 */
export default function splitMap(s, reg, fn = (head, tail)=>([head, tail])) {
  let p1 = 0, p2 = 0, p3
  let head, tail // 用于fn的参数
  let res = [] // 结果
  reg = new RegExp(reg, 'g') // 强制g flag
  while(1){
    const exec = reg.exec(s)
    if ( !exec ) { // 说明到尾了
      p3 = undefined
    } 
    else {
      p3 = exec.index
    }

    head = s.slice(p1, p2)
    tail = s.slice(p2, p3)
    if ( head || tail ) {
      res.push(fn(head, tail))
    } 
    if ( !exec ) {
      break
    } 
    p1 = p3
    p2 = p1 + exec[0].length
  }
  return res
}

