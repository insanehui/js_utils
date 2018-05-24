/*
 * 可校验的组件，称为Validatable，其要符合的原则：
 * value, onChange, 支持validity()方法，返回是否valid的详细信息，参见dom的api
 * 注：
 *  通过一个onValid()回调，似乎也是一种方式，目前暂时无法凭空判断哪种方法更佳，姑且先采用inst method的方法
 */
import React, {
  // forwardRef, 
  PureComponent, 
  // Fragment, 
  createRef
} from 'react'

// hoc, 赋予validity()方法
export const validatify = El => {
  class Validity extends PureComponent {
    /*
     * 实例方法
     */
    validity = ()=>{
      return this.refs.el.validity
    }

    render(){
      return <El {...this.props} ref='el' />
    }
  }
  return Validity
}

/*
 * 要求El为validatified, ，赋予checkValidity()方法
 */
export const validatable = render => El => {
  class Validatable extends PureComponent {
    constructor(p) {
      super(p)
      this.ref = createRef()
    }

    state = {
      invalid : false,
    }

    /*
     * on = true代表开启校验，否则为关闭校验
     */
    checkValidity = (on = true)=>{
      const {valid} = this.ref.current.validity()
      this.setState({ invalid : on && !valid })
    }

    render() {
      const {invalid} = this.state 
      return render(El, this.props, this.ref, invalid)
    }
  }
  return Validatable
}

  /*
class Validable extends PureComponent {
  state = {
    invalid : false,
  }

  checkValidity = (on = true)=>{
    const {valid} = this.refs.el.validity()
    this.setState({ invalid : !valid })
  }

  render() {
    const {invalid} = this.state 
    return <input {...this.props} ref='el' style={{
      borderColor : invalid ? 'red' : 'gray',
    }} />
  }
}
*/
