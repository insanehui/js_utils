// 一个极简单的计数器，用于生成某些唯一序号的场合（仅限于当前程序）

let i = 0

export function count(){
  return i++
}

// 作为字符串
export function scount(){
  return '' + i++
}

// 增加一个下划线，便于拼接时作为分隔符
export function _count(){
  return '_' + i++
}
