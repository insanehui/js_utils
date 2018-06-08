/*
 * 从正则表达式创建类
 */
import Base from './Base.js'

const maker = reg => {
  return class extends Base {
    read = str=>{
      const match = (new RegExp(reg, 'y')).exec(str)[0]
      this.data = match
      return str.slice(match.length)
    }
  }
}

export default maker
export const Line = maker(/.*\n?/)
