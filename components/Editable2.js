/*
 * 一个新的Editable
 */
import React, { PureComponent } from 'react'

import KeyCode from '../keycode.js'

class Editable extends PureComponent {

  state = {
    is_editing : false,
  }

  static defaultProps = {
    tag : 'span',
    autoSelect : true, // 激活输入模式是否自动选择
  }

  on = ()=>this.setState({ is_editing : true })

  off = ()=>this.setState({ is_editing : false })

  editKeyDown = e=>{
    const {onChange} = this.props
    const {keyCode} = e
    const {ENTER} = KeyCode
    const {input} = this

    if (keyCode === ENTER ) {
      onChange && onChange(input.value)
      this.off()
    }
    // esc键会自动触发blur消息
  }

  input_ref = el=>{ 
    const {autoSelect} = this.props
    if ( el ) {
      this.input=el
      if ( autoSelect ) {
        el.select()
      } 
    } 
  } 

  Input = ()=>{
    const {value} = this.props
    const input = {
      defaultValue : value,
      style : {
        fontSize : 'inherit',
        fontFamily : 'inherit',
        border : 'none',
        outline : 'none',
      },
      ref : this.input_ref,
      onKeyDown : this.editKeyDown,
      onBlur : this.off,
    }
    return <input {...input}/>
  }

  render() {
    const {tag, value,  
      autoSelect, onChange, // filter
      ...forward} = this.props
    const {is_editing} = this.state 
    const Tag = tag

    const props = {
      ...forward,
      onClick : ()=>this.setState({ is_editing : true }),
    }

    return <Tag {...props}>
      {is_editing ? this.Input() : 
        <span style={{cursor:'text'}} >
          {value}
        </span>
      }
    </Tag>
  }
}

export default Editable

