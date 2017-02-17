// 一个极简单的计数器，用于生成某些唯一序号的场合（仅限于当前程序）

class Counter {
  i = 0

  count(){
    return this.i++
  }

  // 作为字符串
  scount(){
    return '' + this.i++
  }

  // 增加一个下划线，便于拼接时作为分隔符
  _count(){
    return '_' + this.i++
  }

}

export function New(){
  return new Counter()
}

const def = New()

export const count = def.count.bind(def)
export const scount = def.scount.bind(def)
export const _count = def._count.bind(def)
