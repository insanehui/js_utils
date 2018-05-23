/*
 * 从正则表达式构造一个类
 */
import Base from './Base.js'

export default regx => {
  return class extends Base {
    read = str=>{
      const p = str.search(regx)
      this.data = match
      return str.slice(match.length)
    }
  }
}
