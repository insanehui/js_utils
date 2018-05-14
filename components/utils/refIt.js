/*
 * 加上该装饰器之后，就可以使用ref={this.refMe('xxx')}来将ref绑定到 this.xxx
 */
import isDev from '../../web/is_dev.js'

export default base => {
  class RefHelper extends base {
    constructor(p) {
      super(p)
      this.refMe = (name = 'refed') => el=>{
        this[name] = el
      }
    }
  }
  return refHelper
}
