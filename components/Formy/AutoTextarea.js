/*
 * 能自动size的textarea
 * 使用autosize库
 */
import React from 'react'
import {findDOMNode} from 'react-dom'
import S from 'styled-components'
import autosize from 'autosize'

class AutoTextarea extends React.PureComponent {
  static defaultProps = {
    onChange : x=>x,
  }

  componentDidMount(){
    this.el = findDOMNode(this)
    autosize(this.el)
  }

  componentWillUnmount(){
    autosize.destroy(this.el)
  }

  render() {
    const {onChange, ...rest} = this.props
    const p = {
      rows : 1,
      onChange : (...para)=>{
        onChange(...para)
      },
      ...rest,
    }

    return <textarea {...p}/>
  }
}

export default S(AutoTextarea)`
    resize: none;
`
