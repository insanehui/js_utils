/*
 * 可将A, B, C...组成的一个新的结构
 */
import Base from './Base.js'

export default (...Children) => {

  return class extends Base {
    read = str=>{
      const children = []
      let data = ''

      for (const Child of Children) {
        const child = new Child()
        str = child.read(str)
        data += child.data
        children.push(child)
      }

      this.data = data
      this.children = children
      return str
    }
  }
}

