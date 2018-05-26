/*
 * ValidityReactor: 
 * > 具有checkValidity(boolean, ...扩展参数)
 * > 该方法不返回值，只会引起组件的展示形态的变化，比如可用来展示一些校验的提示信息等
 * TODO: 这里onChange之后，会丢失ctx，但要考虑是否有必要
 */

import { PureComponent, createRef } from 'react'
import {Input as input} from './checker.js'

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
      invalid : false,
    }

    /*
     * forward一下 validity()方法
     */
    validity = ()=>{
      return this.ref.current.validity()
    }

    /*
     * on = true代表开启校验，否则为关闭校验
     */
    checkValidity = (on = true)=>{
      const {valid} = this.validity()
      this.setState({ invalid : on && !valid })
    }

    render() {
      const {invalid} = this.state 
      return render(El, this.props, this.ref, invalid)
    }
  }
  return ValidationReactor
}
export default reactor
export const Input = x=>reactor(x)(input)
