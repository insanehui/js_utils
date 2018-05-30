/*
 * 用于forward dom的一些属性
 */
import _ from 'lodash'
import names from './enumEvents/index.js'

export function events(p){
  return _.pick(p, names)
}

/*
 * hoc: 用来forward未被defaultProps定义的属性
 * 用法
 * @forwardable
 * class C {
 *  static defaultProps = {
 *    a: 1,
 *    b: 2,
 *  }
 *  render {
 *    return <A {...this.forwarded()} />
 *  }
 * }
 *
 */
export const forwardable = Cmp=>{
  const keys = _.keys(Cmp.defaultProps)
  if ( !keys.length ) {
    return Cmp
  } 
  return class New extends Cmp {
    forwarded = ()=>{
      return _.omit(this.props, keys)
    }
  }
}
