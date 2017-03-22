/*
 * 基于fetch实现的http客户端，模拟koa的中间件模式
 * fetch作为一个参数传进来
 * 中间件有两类，一种是之前，采用_use ，另一种是之后，用use_
 * _use的形式是 fn(...para) => [...para]
 * use_形式是 fn(res) => new_res
 *
 * 采用函数式的模式来编写逻辑
 */

class Foa {

  constructor(fetch) {
    this.middles = []

    this.fetch = fetch
  }

  _use(middle) {
    const old_fetch = this.fetch

    this.fetch = async (...para) = > {
      return old_fetch(middle(...para))
    }
  }

  use_(middle) {
    const old_fetch = this.fetch

    this.fetch = async (...para) = > {
      const tmp = await old_fetch(...para)
      return middle(tmp)
    }
  }
}

export default function(...para){ // New

  const inst =  new Foa(...para)

  const fn = inst.fetch.bind(inst)

  _.extend(fn, inst)

  for(let i of Object.getOwnPropertyNames(inst.__proto__)) { // 这是一个偏方！
    fn[i] = inst[i] 
  }

  return fn
}


