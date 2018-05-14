/*
 * 将e.target.value的原生控件改为标准的value的形式
 * 要求为controlled形式
 */
import React, { PureComponent } from 'react'
import displayName from '../displayName/get.js'

export const valuefy = Control => {
  class Valuefied extends PureComponent{

    static displayName = `${process.env.NODE_ENV === 'development' ? 'valuefy' : 'vfy'}(${displayName(Control)})`

    static defaultProps = {
      onChange : ()=>{},
    }

    render(){
      let {onChange, value, ...rest} = this.props

      if ( value === undefined && Control === 'input' ) {
        value = ''
      } 

      return <Control {...{...rest, value}} onChange={e=>onChange(e.target.value)} />
    }
  }

  return Valuefied
}
