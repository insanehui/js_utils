/*
 * 一个过期会expire的对象管家
 * 异步
 */
export function createExpire(ct, ms) {
  /*
   * ct是一个类似的工厂函数（直接调用构造，不同构造函数需要new）
   * 要求构造出来的对象有以下成员：
   * key
   * clean() // 扮演一个"析构"的清理的角色
   *
   * ms表示超时时间
   */

  const data = {}

  const timers = {}

  const remove = async key=>{ // 移除某个key所对应的对象
    await (data[key] && data[key].clean())
    delete data[key]
    global.clearTimeout(timers[key])
    delete timers[key]
  }

  const touch = key=>{
    global.clearTimeout(timers[key])
    timers[key] = global.setTimeout(()=>{
      remove(key)
    }, ms)
  }

  // 返回一个有一系列方法的对象
  return {
    create : (...para)=>{
      const obj = ct(...para)
      const {key} = obj
      data[key] = obj
      touch(key)
    },

    get(key){
      const obj = data[key]
      if ( obj ) {
        touch(key)
      } 
      return obj
    },

    remove,
  }
}
