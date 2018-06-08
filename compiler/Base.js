/*
 * 基础类
 */
export default class Base {
  data = '' // 字符
  toString = ()=>{
    return this.data
  }

  /*
   * 需要被子类覆盖。它的作用是，'吃'掉传入str里'属于'自己的部分，放入this.data中
   * 然后返回str剩下的部分
   */
  read = str => str
}
