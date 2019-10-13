/*
 * 将一个控件的值绑定到父组件的state里。
 * 提供两种形式：
 *  散函数
 *  hoc装饰器
 *  （外壳组件由于使用不方便，暂不提供）
 */
import _ from 'lodash'

// hoc装饰器
export const bindValueToState = (methodName='bindState') => base => {
  class binder extends base {
    constructor(p) {
      super(p)
      this[methodName] = stateProp => ({
        value : _.get(this.state, stateProp),
        onChange : v=>this.setState({ [stateProp] : v })
      })
    }
  }
  return binder
}

// 散函数
export default ctx => (stateProp='value', cb) => ({
  value : _.get(ctx.state, stateProp),
  // 把它加到setState的回调里
  onChange : v=>ctx.setState({ [stateProp] : v }, ()=>cb && cb(v))
})

