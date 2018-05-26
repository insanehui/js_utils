/*
 * ValidityReactor: 
 * > 具有checkValidity(boolean, ...扩展参数)
 * > 该方法不返回值，只会引起组件的展示形态的变化，比如可用来展示一些校验的提示信息等
 * TODO: 这里onChange之后，会丢失ctx，但要考虑是否有必要
 */

import { PureComponent, createRef, Children, cloneElement} from 'react'
import _ from 'lodash'
import {Input as input} from './checker.js'

const {toArray} = Children

/*
 * 要求El为ValidityCheckable, 在此基础上赋予checkValidity()方法
 */
const reactor = render =>  
  /*
  * (El, props, ref, invalid)
  * ref参数用来forward用
  */ 
  El => {
  class ValidationReactor extends PureComponent {
    constructor(p) {
      super(p)
      this.ref = createRef()
    }

    state = {
      validity : {
        valid:true,
      },
    }

    /*
     * forward一下 validity()方法
     */
    validity = ()=>{
      return this.ref.current.validity()
    }

    /*
     * v不传时，以validity的结果为准
     * 否则以v的数据为准
     */
    checkValidity = (v=null) =>{
      if ( !v ) {
        v = this.validity()
      } 
      this.setState({validity : v})
    }

    parseEl = tree => {
      const {parseEl, ref} = this
      return toArray(tree).map(child => {
        // 先检查是不是El类型
        if ( child.type === El ) {
          return cloneElement(child, {...this.props, ref})
        } 
        const sub = _.get(child, 'props.children')
        if ( sub ) { // 如果有孩子，进入递归
          return cloneElement(child, {}, parseEl(sub))
        } 
        else {
          return child
        }
      })
    }

    render() {
      const {validity} = this.state 
      /*
       * 这里制定一个使用约束：
       * render里不能对El进行hoc包装，因为render主要用于控制El外的行为，需要El作为参数仅仅是作为一个占位符
       * 如果需要包装El，则应当在reactor的外面就包装好
       */
      // return render(El, this.props, this.ref, invalid)
      const el = render(El, validity) // 得到render回来的react element
      return this.parseEl(el)
      // 现对其进行遍历，找到El的位置，并注入props和ref
    }
  }
  return ValidationReactor
}
export default reactor
export const Input = x=>reactor(x)(input)
