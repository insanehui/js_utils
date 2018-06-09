/*
 * 描述一个A包含B, C, D的文法结构
 */
import Base from './Base.js'

export default (Container, ...Children) => {

  const makeChildren = data => {
    const res = []
    for (const Child of Children) {
      const child = new Child()
      data = child.read(data)
      res.push(child)
    }
    return res
  }

  return class extends Base {
    read = str=>{
      const parent = new Container()
      const res = parent.read(str)
      this.data = parent.data
      this.children = makeChildren(this.data)
      return res
    }
  }
}

