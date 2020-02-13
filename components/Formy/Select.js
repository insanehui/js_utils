/*
 * 对原生select的一个小包装
 */
import React from 'react'
import _ from 'lodash'

export default class Select extends React.PureComponent {
  static defaultProps = {
    onChange : x=>x,
    defaultValueOn : true, // default是一个开关，默认开启，返回一个选项里的值
  }

  componentDidMount(){
    this.refresh()
  }

  componentDidUpdate(pp, ps, snapshot){
    this.refresh()
  }

  refresh = ()=>{
    const {value, onChange, options, defaultValueOn} = this.props
    /*
     * 注：_.find里不能直接用简写的 {value}，因为会进行严格比较
     */
    // eslint-disable-next-line
    if ( defaultValueOn && !_.find(options, v=>v.value == value)) { // 如果value在options里没有
      const val = _.get(options, '0.value')
      /*
       * 注：这里一定要有这个判断，否则会陷入无限循环！
       */
      if ( val !== value && options ) { // 如果options都没有，就不必作后面的操作了
        onChange(val === undefined ? undefined : val+'') // 为了跟原生select保持一致，value统一为字符串格式
      } 
    } 
  }

  render() {
    const {value, onChange, options, 
      defaultValueOn,
      ...rest} = this.props
    return <select value={value} onChange={e=>{
      onChange(e.target.value)
    }} {...rest} >
      {_.map(options, ({label, value}, i) => <option key={i} value={value}>
        {label}
      </option>)}
    </select>
  }
}
