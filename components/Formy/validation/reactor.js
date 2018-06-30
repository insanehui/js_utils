/*
 * ValidityReactor: 
 * > 具有checkValidity(validity)
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
const maker = advanced => render =>  
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

    validity = ()=>{
      return this._validity || this.ref.current.validity()
    }

    /*
     * 如果被临时缓存了一个validity对象，则以该临时缓存的为主
     * 否则取控件本身的validity
     * 这样的设计可以用来服务比如密码校验的场景
     */
    checkValidity = (validity=null) =>{
      this._validity = validity
      this.setState({validity : this.validity()})
    }

    parseEl = tree => {
      const {parseEl, ref} = this
      return toArray(tree).map(child => {
        // 先检查是不是El类型
        if ( child.type === El ) {
          return cloneElement(child, {
            ...(!advanced && this.props), 
            ref, 
            /*
             * 注：这里要接力onChange的ctx
             */
            onChange:v=>{
              const onChange = _.get(this.props, 'onChange')
              _.isFunction(onChange) && onChange(v, this)
            }
          })
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
      const el = render(El, validity, advanced ? this.props : undefined)
      return this.parseEl(el)
      // 现对其进行遍历，找到El的位置，并注入props和ref
    }
  }
  return ValidationReactor
}
const reactor = maker()
export default reactor
export const advanced = maker(true)

export const Input = x=>reactor(x)(input)
export const xInput = x=>advanced(x)(input)
