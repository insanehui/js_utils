/*
 * 基于fetch实现的http客户端，模拟koa的中间件模式
 * fetch作为一个参数传进来
 * 中间件有两类，一种是之前，采用_use ，另一种是之后，用use_
 * _use的形式是 fn(...para) => [...para]
 * use_形式是 fn(res) => new_res , 可以是async函数
 *
 * 约定使用res.Data来传递数据
 *
 * 采用函数式的模式来编写逻辑
 */
import _ from 'lodash'

class Foa {

  constructor(fetch) {
    this.fetch = fetch
  }

  _use(middle) {
    const old_fetch = this.fetch

    async function new_fetch(...para) {
      return old_fetch(middle(...para))
    }

    this.fetch = new_fetch // 注：this.fetch = async ... 这样的语法好像不能通过。。。
  }

  use_(middle) {
    const old_fetch = this.fetch

    async function new_fetch(...para) {
      const tmp = await old_fetch(...para)
      return middle(tmp)
    }

    this.fetch = new_fetch
  }

  _def_call_(...para) { // 该方法不直接调用，用途见 <url:#r=using_def_call>
    return this.fetch(...para)
  }
}

export default function(...para){ // New

  const inst =  new Foa(...para)

  const fn = inst._def_call_.bind(inst) // <?utl:id=using_def_call?>

  for(let i of Object.getOwnPropertyNames(inst.__proto__)) { // 这是一个偏方！
    fn[i] = inst[i].bind(inst)
  }

  return fn
}


